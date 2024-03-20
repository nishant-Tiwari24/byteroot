import { Alert } from 'antd'
import React from 'react'

type Props = {
  email: string
}

export const MessageSuccess: React.FC<Props> = ({ email }) => {
  return (
    <Alert
      style={{ textAlign: 'center' }}
      message={`We sent an email to ${email} with a link to reset your password`}
      type="success"
    />
  )
}
