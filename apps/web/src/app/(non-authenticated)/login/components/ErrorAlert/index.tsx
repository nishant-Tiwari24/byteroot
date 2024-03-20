import { Alert } from 'antd'
import React from 'react'

type Props = {
  errors: string[]
}

export const ErrorAlert: React.FC<Props> = ({ errors }) => {
  return (
    <div style={{ minHeight: '40px', width: '100%' }}>
      {errors.length > 0 && (
        <Alert
          type="error"
          message={[...errors].map((error, errorIndex) => (
            <div key={errorIndex}>{error}</div>
          ))}
        />
      )}
    </div>
  )
}
