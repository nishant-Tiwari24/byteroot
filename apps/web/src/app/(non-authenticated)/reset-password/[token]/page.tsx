'use client'
import { RouterObject } from '@web/core/router'
import { AuthenticationHook } from '@web/domain/authentication'
import { Button, Flex, Typography } from 'antd'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Header } from '../../components/Header'
import { ErrorAlert } from './components/ErrorAlert'
import { FormToken } from './components/form'
import { MessageSuccess } from './components/messageSuccess'

const { Text } = Typography

export default function ResetPasswordTokenPage() {
  const { token } = useParams<{ token: string }>()
  const router = useRouter()
  const { isLoading, isSuccess, reset, errors } =
    AuthenticationHook.useResetPassword()

  useEffect(() => {
    if (isSuccess) {
      onSuccess()
    }
  }, [isSuccess])

  const handleSubmit = (password: string) => {
    reset(token, password)
  }

  const onSuccess = async () => {}

  return (
    <>
      <Flex align="center" justify="center" vertical flex={1}>
        <Flex
          vertical
          style={{
            width: '340px',
            paddingBottom: '100px',
            paddingTop: '100px',
          }}
          gap="middle"
        >
          <Header description="Change your password" />

          <ErrorAlert errors={errors} />

          {isSuccess && <MessageSuccess />}

          {!isSuccess && (
            <FormToken isLoading={isLoading} onSubmit={handleSubmit} />
          )}

          <Flex justify="center" align="center">
            <Button
              ghost
              style={{ border: 'none' }}
              onClick={() => router.push(RouterObject.route.LOGIN)}
            >
              <Flex gap={'small'} justify="center">
                <Text>Sign in</Text>
              </Flex>
            </Button>

            <Text type="secondary">or</Text>

            <Button
              ghost
              style={{ border: 'none' }}
              onClick={() => router.push(RouterObject.route.REGISTER)}
            >
              <Flex gap={'small'} justify="center">
                <Text>Sign up</Text>
              </Flex>
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}
