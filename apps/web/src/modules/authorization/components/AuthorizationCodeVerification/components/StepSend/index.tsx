import { Model } from '@web/domain'
import { Button, Flex, Spin, Typography } from 'antd'
import React from 'react'

interface Props {
  user: Model.User
  isLoading: boolean
  onClick: () => void
}

export const StepSend: React.FC<Props> = ({ user, isLoading, onClick }) => {
  return (
    <Flex align="center" vertical gap="large">
      <Typography>A verification code will be sent to {user.email}</Typography>

      <Button type="primary" onClick={onClick} disabled={isLoading}>
        {isLoading ? <Spin /> : 'Send'}
      </Button>
    </Flex>
  )
}
