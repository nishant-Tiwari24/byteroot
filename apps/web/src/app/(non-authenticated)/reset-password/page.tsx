'use client'
import { RouterObject } from '@web/core/router'
import { AuthenticationHook } from '@web/domain/authentication'
import { Button, Flex, Typography } from 'antd'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Header } from '../components/Header'
import { ErrorAlert } from './components/ErrorAlert'
import { ResetPasswordForm } from './components/Form'
import { MessageSuccess } from './components/MessageSuccess'

const { Text } = Typography

export default function ResetPasswordPage() {
  const router = useRouter()

  const [email, setEmail] = useState<string>()

  const { isLoading, isSuccess, sendEmail, errors } =
    AuthenticationHook.useSendResetPassword()

  useEffect(() => {
    if (isSuccess) {
      onSuccess()
    }
  }, [isSuccess])

  const handleSubmit = (email: string) => {
    sendEmail(email)
    setEmail(email)
  }

  const onSuccess = async () => {}

  return (
    <Flex align="center" justify="center" vertical flex={1}>
      <Flex
        vertical
        style={{ width: '340px', paddingBottom: '100px', paddingTop: '100px' }}
        gap="middle"
      >
        <Header description="You will receive a verification code" />

        <ErrorAlert errors={errors} />

        {isSuccess && <MessageSuccess email={email} />}

        {!isSuccess && (
          <ResetPasswordForm isLoading={isLoading} onSubmit={handleSubmit} />
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
  )
}
