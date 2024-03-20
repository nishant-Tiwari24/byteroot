'use client'

import { useCoreStore } from '@web/core/store'
import { Model } from '@web/domain'
import { useNotificationCreated } from '@web/domain/notification'
import { NavigationLayout } from '@web/layouts/NavigationLayout'
import { AuthenticationGuard } from '@web/modules/authentication'

import { UserCodeVerification } from '@web/modules/user/components'
import { ReactNode } from 'react'

export default function AuthenticatedLayout({
  children,
}: {
  children: ReactNode
}) {
  const store = useCoreStore()

  useNotificationCreated((notification: Model.Notification) => {
    const notificationsUpdated = [...store.notifications]

    notificationsUpdated.push(notification)

    store.setNotifications(notificationsUpdated)
  })

  return (
    <AuthenticationGuard>
      <UserCodeVerification>
        <NavigationLayout>{children}</NavigationLayout>
      </UserCodeVerification>
    </AuthenticationGuard>
  )
}
