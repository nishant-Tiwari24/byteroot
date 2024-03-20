'use client'
import { RouterObject } from '@web/core/router'
import { useCoreStore } from '@web/core/store'
import { Api, Model } from '@web/domain'
import { AuthenticationHook } from '@web/domain/authentication'
import { useAuthentication } from '@web/modules/authentication'
import { GlobalService } from '@web/modules/global'
import { GoogleOauth } from '@web/modules/googleOauth'
import { GoogleButton } from '@web/modules/googleOauth/components/googleButton'
import { Button, Flex, Typography } from 'antd'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useEffect } from 'react'
import { Header } from '../components/Header'
import { ErrorAlert } from './components/ErrorAlert'
import { RegisterForm } from './components/RegisterForm'

const { Text } = Typography

export default function RegisterPage() {
  const router = useRouter()
  const store = useCoreStore()
  const { enqueueSnackbar } = useSnackbar()
  const authentication = useAuthentication()

  const {
    register,
    isLoading: isLoadingLogin,
    isSuccess: isSuccessLogin,
    errors: errorsLogin,
  } = AuthenticationHook.useRegister()

  const {
    googleCallback,
    isLoading: isLoadingGoogle,
    isSuccess: isSuccessGoogle,
    errors: errorsGoogle,
  } = AuthenticationHook.useGoogle()

  const isSuccess = isSuccessLogin || isSuccessGoogle
  const isLoading = isLoadingLogin || isLoadingGoogle || isSuccess
  const errors = [...errorsLogin, ...errorsGoogle]

  useEffect(() => {
    if (isSuccess) {
      onSuccess()
    }
  }, [isSuccess])

  const onError = () => {
    enqueueSnackbar('Could not register with Google', { variant: 'error' })
  }

  const onSuccess = async () => {
    try {
      const user = await Api.User.findMe()

      authentication.login(user)

      await GlobalService.initialiseStore({ store })

      router.push(RouterObject.route.HOME)
    } catch (error) {
      enqueueSnackbar('Something went wrong with the initialization', {
        variant: 'error',
      })
    }
  }

  /* -------------------------------- HANDLERS -------------------------------- */

  const handleSubmit = (values: Partial<Model.User>) => {
    register(values)
  }

  const handleGoogleSuccess = (response: { credential: string }) => {
    googleCallback(response)
  }

  return (
    <Flex align="center" justify="center" vertical flex={1}>
      <Flex
        vertical
        style={{ width: '340px', paddingBottom: '100px', paddingTop: '100px' }}
        gap="middle"
      >
        <Header description="Welcome!" />

        <ErrorAlert errors={errors} />

        <RegisterForm isLoading={isLoading} onSubmit={handleSubmit} />

        {GoogleOauth.useActive() && (
          <GoogleButton onSuccess={handleGoogleSuccess} onError={onError} />
        )}

        <Button
          ghost
          style={{ border: 'none' }}
          onClick={() => router.push(RouterObject.route.LOGIN)}
        >
          <Flex gap={'small'} justify="center">
            <Text type="secondary">Have an account?</Text> <Text>Sign in</Text>
          </Flex>
        </Button>
      </Flex>
    </Flex>
  )
}
