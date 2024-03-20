import { BellFilled } from '@ant-design/icons'
import { RouterObject } from '@web/core/router'
import { useCoreStore } from '@web/core/store'
import { Badge, Button } from 'antd'
import { useRouter } from 'next/navigation'
import React from 'react'

export const TabNotification: React.FC = () => {
  const router = useRouter()
  const store = useCoreStore()
  const countNotifications = store.notifications.length

  const goTo = (url: string) => {
    router.push(url)
  }

  return (
    <>
      <Badge
        count={countNotifications}
        overflowCount={99}
        color="yellow"
        className=" text-green-400 font-semibold rounded-full w-6 h-12 flex justify-center items-center"
      >
        <Button
          onClick={() => goTo(RouterObject.route.NOTIFICATIONS)}
          icon={
            <BellFilled
              className="text-green-200"
              size={24}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />
          }
          shape="circle"
        />
      </Badge>
    </>
  )
}
