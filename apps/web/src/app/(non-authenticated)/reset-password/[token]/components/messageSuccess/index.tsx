import { Alert } from 'antd'
import React from 'react'

export const MessageSuccess: React.FC = () => {
  return <Alert type="success" message="Your password has been changed." />
}
