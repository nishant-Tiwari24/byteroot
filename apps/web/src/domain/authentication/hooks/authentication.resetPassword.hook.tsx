import { HttpError } from '@web/core/http'
import { Api } from '@web/domain/api'
import { useState } from 'react'

interface Return {
  reset: (token: string, password: string) => Promise<void>
  isLoading: boolean
  isSuccess: boolean
  errors: string[]
}

export const useAuthenticationResetPassword = (): Return => {
  const [isLoading, setLoading] = useState(false)
  const [isSuccess, setSuccess] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  const reset = async (token: string, password: string) => {
    setLoading(true)

    setErrors([])

    try {
      await Api.Authentication.resetPassword(token, password)

      setSuccess(true)
    } catch (error) {
      const code = HttpError.getCode(error)

      const isIncorrect = code === 4

      if (isIncorrect) {
        setErrors(['Your token has expired'])
      } else {
        setErrors(['Something went wrong'])
      }
    }

    setLoading(false)
  }

  return {
    reset,
    isLoading,
    isSuccess,
    errors,
  }
}
