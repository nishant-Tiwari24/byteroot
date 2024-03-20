import { useSocket } from '@web/core/socket'
import { Notification } from './notification.model'

export const useNotificationCreated = (
  callback: (notification: Notification) => void,
) => {
  return useSocket('notification.created', callback)
}
