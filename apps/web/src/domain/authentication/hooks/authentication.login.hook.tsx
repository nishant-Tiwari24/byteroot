import { HttpError } from '@web/core/http'
import { Api } from '@web/domain/api'
import { useState } from 'react'
import { AuthenticationHook } from '../authentication.hook'

interface Return {
  login: (values: { email: string; password: string }) => Promise<void>
  isLoading: boolean
  isSuccess: boolean
  errors: string[]
}

export const useAuthenticationLogin = (): Return => {
  const [isLoading, setLoading] = useState(false)
  const [isSuccess, setSuccess] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  const authenticationToken = AuthenticationHook.useToken()

  const login = async (values: { email: string; password: string }) => {
    setLoading(true)

    setErrors([])

    try {
      const { token } = await Api.Authentication.login(values)

      authenticationToken.setToken(token)

      setSuccess(true)
    } catch (error) {
      const code = HttpError.getCode(error)

      const isIncorrect = code === 2

      if (isIncorrect) {
        setErrors(['Incorrect email or password'])
      } else {
        setErrors(['Something went wrong'])
      }
    }

    setLoading(false)
  }

  return {
    login,
    isLoading,
    isSuccess,
    errors,
  }
}
