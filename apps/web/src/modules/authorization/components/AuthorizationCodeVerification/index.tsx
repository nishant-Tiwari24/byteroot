import { Model } from '@web/domain'
import { AuthorizationHook, AuthorizationType } from '@web/domain/authorization'
import { Button, Flex, Modal, Typography } from 'antd'
import React from 'react'
import { ErrorAlert } from './components/ErrorAlert'
import { StepCodeInput } from './components/StepCodeInput'
import { StepSend } from './components/StepSend'
import { StepSuccess } from './components/StepSuccess'

interface Props {
  user: Model.User
  title: string
  type: AuthorizationType
  onComplete: () => void
  onCancel: () => void
}

export const AuthorizationCodeVerification: React.FC<Props> = ({
  title,
  type,
  user,
  onComplete,
  onCancel,
}) => {
  const {
    isSent,
    isVerified,
    send,
    verify,
    isLoadingSend,
    isLoadingVerify,
    errors,
  } = AuthorizationHook.useCode({ type, user })

  const handleSend = () => {
    send()
  }

  const handleCodeSubmit = (keyPrivate: string) => {
    verify(keyPrivate)
  }

  const handleClickContinue = () => {
    onComplete()
  }

  const isStepSend = !isSent && !isVerified
  const isStepInput = isSent && !isVerified
  const isStepSuccess = isSent && isVerified

  const hasErrors = errors.length > 0

  return (
    <>
      <Modal open={true} onCancel={onCancel} closeIcon={false} footer={[]}>
        <Flex vertical gap="large" style={{ height: '300px' }}>
          <Flex vertical gap="large" flex={1}>
            <Typography.Title style={{ textAlign: 'center' }}>
              {title}
            </Typography.Title>

            {isStepSend && (
              <StepSend
                user={user}
                isLoading={isLoadingSend}
                onClick={handleSend}
              />
            )}

            {isStepInput && (
              <StepCodeInput
                user={user}
                isLoadingSend={isLoadingSend}
                isLoadingSubmit={isLoadingVerify}
                onSubmit={handleCodeSubmit}
                onClickSend={handleSend}
              />
            )}
          </Flex>
          {isStepSuccess && <StepSuccess onContinue={handleClickContinue} />}

          {hasErrors && <ErrorAlert messages={errors} />}

          {!isStepSuccess && (
            <Flex justify="center">
              <Button key="cancel" onClick={onCancel}>
                Cancel
              </Button>
            </Flex>
          )}
        </Flex>
      </Modal>
    </>
  )
}
