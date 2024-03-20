import { Model } from '@web/domain'
import { List, Typography } from 'antd'
import React from 'react'
import { NotificationCard } from './components/NotificationCard'

const { Text } = Typography

type Props = {
  notifications: Model.Notification[]
  onDelete: (notification: Model.Notification) => void
  onClick: (notification: Model.Notification) => void
}

export const NotificationList: React.FC<Props> = ({
  notifications,
  onDelete,
  onClick,
}) => {
  const isEmpty = notifications.length === 0

  return (
    <>
      {isEmpty ? (
        <Text type="secondary">You have no notifications</Text>
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={notifications}
          renderItem={notification => (
            <List.Item style={{ width: '100%' }}>
              <NotificationCard
                notification={notification}
                onClick={() => onClick(notification)}
                onDelete={() => onDelete(notification)}
              />
            </List.Item>
          )}
        />
      )}
    </>
  )
}
