import { GoogleOAuthProvider } from '@react-oauth/google'
import { useConfiguration } from '@web/core/configuration'
import React, { ReactNode } from 'react'

export namespace GoogleOauth {
  export const useClientId = (): string => {
    const { googleClientId } = useConfiguration()

    return googleClientId
  }

  export const useActive = (): boolean => {
    return !!useClientId()
  }

  export const Provider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const clientId = useClientId()

    if (!useActive()) {
      return children
    }

    return (
      <GoogleOAuthProvider clientId={clientId}>{children}</GoogleOAuthProvider>
    )
  }
}
