import { Alert } from 'antd'
import React from 'react'

interface Props {
  messages: string[]
}
export const ErrorAlert: React.FC<Props> = ({ messages }) => {
  return (
    <>
      {messages.length > 0 && (
        <Alert
          message={messages.map((error, errorIndex) => `${error}\n`)}
          type="error"
        />
      )}
    </>
  )
}
