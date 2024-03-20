import { GoogleLogin } from '@react-oauth/google'
import React from 'react'

interface Props {
  onSuccess: (response) => void
  onError: () => void
}

export const GoogleButton: React.FC<Props> = ({ onSuccess, onError }) => {
  return (
    <>
      <GoogleLogin
        width="340"
        text="continue_with"
        theme="outline"
        onSuccess={onSuccess}
        onError={onError}
      />
    </>
  )
}
