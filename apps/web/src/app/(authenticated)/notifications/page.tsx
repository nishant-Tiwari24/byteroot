'use client'

import { Flex, Typography } from 'antd'

import { useHttpAction } from '@web/core/http/http.action.hook'
import { useCoreStore } from '@web/core/store'
import { Api } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'
import { useNotificationToast } from '@web/modules/notification/components'
import { Actions } from './components/Actions'
import { NotificationList } from './components/NotificationList'

export default function NotificationsPage() {
  const { notifications, setNotifications } = useCoreStore()

  const notificationToast = useNotificationToast()
  const actionClearAll = useHttpAction()

  const handleClearAll = () => {
    actionClearAll.run(() =>
      Api.Notification.deleteAllByMe().then(() => setNotifications([])),
    )
  }

  const canClearAll = notifications.length > 0

  return (
    <PageLayout layout="super-narrow">
      <Flex justify="space-between" align="center">
        <Typography.Title level={1}>Notifications</Typography.Title>
        <Actions
          canClearAll={canClearAll}
          isLoadingClearAll={actionClearAll.isLoading}
          onClearAll={handleClearAll}
        />
      </Flex>

      <NotificationList
        notifications={notifications}
        onClick={notificationToast.onClick}
        onDelete={notificationToast.onDelete}
      />
    </PageLayout>
  )
}
