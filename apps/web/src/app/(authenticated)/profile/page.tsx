'use client'

import { Avatar, Button, Flex, Typography } from 'antd'

import { RouterObject } from '@web/core/router'
import { Api, Model } from '@web/domain'
import { AuthenticationHook } from '@web/domain/authentication'
import { PageLayout } from '@web/layouts/Page.layout'
import { Utility } from '@web/libraries/utility'
import { useAuthentication } from '@web/modules/authentication'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { UserForm } from './components/userForm'

export default function ProfilePage() {
  const authentication = useAuthentication()
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()
  const { removeToken } = AuthenticationHook.useToken()

  const user = authentication.user as Model.User
  const userInitials = Utility.stringToInitials(user.name)

  const [isLoading, setLoading] = useState(false)
  const [isLoadingLogout, setLoadingLogout] = useState(false)

  const handleSubmit = async (values: Partial<Model.User>) => {
    setLoading(true)

    try {
      const userUpdated = await Api.User.updateOne(user.id, values)
      authentication.setUser(userUpdated)
    } catch (error) {
      enqueueSnackbar('Could not save information', { variant: 'error' })
    }

    setLoading(false)
  }

  const handleClickLogout = async () => {
    setLoadingLogout(true)

    try {
      await Api.Authentication.logout(document)

      removeToken()

      authentication.logout()

      router.push(RouterObject.route.LOGIN)
    } catch (error) {
      enqueueSnackbar('Could not logout', { variant: 'error' })
      setLoadingLogout(false)
    }
  }

  return (
    <PageLayout layout="super-narrow">
      <Flex justify="space-between" align="center">
        <Typography.Title level={1}>Profile</Typography.Title>
        <Button onClick={handleClickLogout} loading={isLoadingLogout}>
          Logout
        </Button>
      </Flex>

      <Flex justify="center" style={{ marginBottom: '30px' }}>
        <Avatar size={80} src={user?.pictureUrl}>
          {userInitials}
        </Avatar>
      </Flex>

      <UserForm
        user={user}
        isLoading={isLoading}
        isDisabled={isLoadingLogout}
        onSubmit={handleSubmit}
      />
    </PageLayout>
  )
}
