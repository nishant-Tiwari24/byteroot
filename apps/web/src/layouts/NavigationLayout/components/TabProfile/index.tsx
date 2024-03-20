import { RouterObject } from '@web/core/router'
import { Utility } from '@web/libraries/utility'
import { useAuthentication } from '@web/modules/authentication'
import { Avatar } from 'antd'
import { useRouter } from 'next/navigation'
import React from 'react'

export const TabProfile: React.FC = () => {
  const router = useRouter()

  const authentication = useAuthentication()

  const user = authentication.user

  const userInitials = Utility.stringToInitials(user.name)

  const goTo = (url: string) => {
    router.push(url)
  }

  return (
    <>
      <Avatar
        src={user?.pictureUrl}
        alt={user?.name}
        size="default"
        onClick={() => goTo(RouterObject.route.PROFILE)}
        style={{ cursor: 'pointer' }}
      >
        {userInitials}
      </Avatar>
    </>
  )
}
