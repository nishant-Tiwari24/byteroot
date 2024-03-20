import { HttpError } from '@web/core/http'
import { Api } from '@web/domain/api'
import { useState } from 'react'
import { AuthenticationHook } from '../authentication.hook'

interface Return {
  googleCallback: (response: { credential: string }) => Promise<void>
  isLoading: boolean
  isSuccess: boolean
  errors: string[]
}

export const useAuthenticationGoogle = (): Return => {
  const [isLoading, setLoading] = useState(false)
  const [isSuccess, setSuccess] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const authenticationToken = AuthenticationHook.useToken()

  const googleCallback = async (response: { credential: string }) => {
    setLoading(true)

    setErrors([])

    try {
      const { token } = await Api.Authentication.googleCallback(response)

      authenticationToken.setToken(token)

      setSuccess(true)
    } catch (error) {
      const code = HttpError.getCode(error)

      const isIncorrect = code === 1

      if (isIncorrect) {
        setErrors(['Could not login with Google'])
      } else {
        setErrors(['Something went wrong'])
      }
    }

    setLoading(false)
  }

  return {
    googleCallback,
    isLoading,
    isSuccess,
    errors,
  }
}
