'use client'

import { Api, Model } from '@web/domain'
import { AuthorizationType } from '@web/domain/authorization'
import { UserManager } from '@web/domain/user'
import { useAuthentication } from '@web/modules/authentication'
import { AuthorizationCodeVerification } from '@web/modules/authorization/components'
import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const UserCodeVerification: React.FC<Props> = ({ children }) => {
  const authentication = useAuthentication()

  const user = authentication.user as Model.User

  const handleComplete = () => {
    window.location.reload()
  }

  const handleCancel = async () => {
    await Api.Authentication.logout(document)

    authentication.logout()
  }

  const isVerified = UserManager.isVerified(user)

  if (isVerified) {
    return <>{children}</>
  }

  return (
    <>
      <AuthorizationCodeVerification
        title="Verify your email"
        user={user}
        type={AuthorizationType.USER_VERIFICATION}
        onComplete={handleComplete}
        onCancel={handleCancel}
      />
    </>
  )
}
