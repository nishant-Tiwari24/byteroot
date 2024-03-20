import { Alert } from 'antd'
import React from 'react'

type Props = {
  errors: string[]
}

export const ErrorAlert: React.FC<Props> = ({ errors }) => {
  return (
    <>
      {errors.length > 0 && (
        <Alert
          message={errors.map((error, errorIndex) => `${error}\n`)}
          type="error"
        />
      )}
    </>
  )
}
