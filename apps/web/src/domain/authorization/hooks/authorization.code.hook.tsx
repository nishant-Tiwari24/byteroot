import { useConfiguration } from '@web/core/configuration'
import { HttpError } from '@web/core/http'

import { Api, Model } from '@web/domain'
import { Utility } from '@web/libraries/utility'
import { useState } from 'react'
import { AuthorizationManager } from '../authorization.manager'
import { AuthorizationType } from '../authorization.model'

interface Props {
  type: AuthorizationType
  user: Model.User
}

interface ReturnType {
  isSent: boolean
  isVerified: boolean
  send: () => Promise<void>
  verify: (keyPrivate: string) => Promise<void>
  isLoadingSend: boolean
  isLoadingVerify: boolean
  errors: string[]
}

export const useCode = ({ type, user }: Props): ReturnType => {
  const [isSent, setSent] = useState<boolean>(false)
  const [isVerified, setVerified] = useState<boolean>(false)
  const [isLoadingSend, setLoadingSend] = useState<boolean>(false)
  const [isLoadingVerify, setLoadingVerify] = useState<boolean>(false)
  const [keyPublic, setKeyPublic] = useState<string>()
  const [errors, setErrors] = useState<string[]>([])

  const { isEnvironmentDevelopment, localEmailServerUrl } = useConfiguration()

  const send = async () => {
    setLoadingSend(true)

    try {
      const { keyPublic } = await Api.Authorization.sendCode(type, user.email)

      setErrors([])
      setKeyPublic(keyPublic)
      setSent(true)

      if (isEnvironmentDevelopment) {
        Utility.openInNewTab(window, localEmailServerUrl)
      }
    } catch (error) {
      setErrors(['Something went wrong. Try again later.'])
    }

    setLoadingSend(false)
  }

  const verify = async (keyPrivate: string) => {
    setLoadingVerify(true)

    try {
      await Api.Authorization.verifyCode(type, user.email, {
        keyPrivate,
        keyPublic,
      })

      setErrors([])
      setKeyPublic(keyPublic)
      setVerified(true)
    } catch (error) {
      const code = HttpError.getCode(error)
      const status = HttpError.getStatus(error)

      const isExpired = AuthorizationManager.isErrorCodeExpired(code, status)
      const isIncorrect = AuthorizationManager.isErrorCodeIncorrect(
        code,
        status,
      )

      if (isExpired) {
        setErrors(['Code has expired. Try again.'])
      } else if (isIncorrect) {
        setErrors(['Code is incorrect.'])
      } else {
        setErrors(['Something went wrong. Try again later.'])
      }
    }

    setLoadingVerify(false)
  }

  return {
    isSent,
    isVerified,
    send,
    verify,
    isLoadingSend,
    isLoadingVerify,
    errors,
  }
}
