import { useHttpAction } from '@web/core/http/http.action.hook'
import { useCoreStore } from '@web/core/store'
import { Api, Model } from '@web/domain'
import { useRouter } from 'next/navigation'

type ReturnType = {
  onDelete: (notification: Model.Notification) => void
  onClick: (notification: Model.Notification) => void
}

export const useNotificationToast = (): ReturnType => {
  const router = useRouter()

  const { notifications, setNotifications } = useCoreStore()

  const actionDelete = useHttpAction()

  const handleDelete = (notification: Model.Notification) => {
    actionDelete.run(() =>
      Api.Notification.deleteOneByMe(notification.id)
        .catch(() => {})
        .then(() => {
          const notificationsUpdated = [...notifications]

          const index = notifications.findIndex(
            item => item.id === notification.id,
          )

          if (index > -1) {
            notificationsUpdated.splice(index, 1)
          }

          setNotifications(notificationsUpdated)
        })
        .catch(() => {}),
    )
  }

  const handleClick = (notification: Model.Notification) => {
    if (notification.redirectUrl) {
      router.push(notification.redirectUrl)

      handleDelete(notification)
    }
  }

  return { onDelete: handleDelete, onClick: handleClick }
}
