import { HttpError } from '@web/core/http'
import { Api } from '@web/domain/api'
import { useState } from 'react'

interface Return {
  sendEmail: (email: string) => Promise<void>
  isLoading: boolean
  isSuccess: boolean
  errors: string[]
}

export const useAuthenticationSendResetPassword = (): Return => {
  const [isLoading, setLoading] = useState(false)
  const [isSuccess, setSuccess] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  const sendEmail = async (email: string) => {
    setLoading(true)

    setErrors([])

    try {
      await Api.Authentication.sendResetPassword(email)
      setSuccess(true)
    } catch (error) {
      // We avoid indicating if the email exists for security reasons
      console.log(error)

      const messages = HttpError.getValidationMessages(error)

      if (messages.length > 0) {
        setErrors(messages)
      } else {
        setErrors(['Something went wrong'])
      }
    }

    setLoading(false)
  }

  return {
    sendEmail,
    isLoading,
    isSuccess,
    errors,
  }
}
