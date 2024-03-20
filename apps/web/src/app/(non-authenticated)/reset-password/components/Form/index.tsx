import { Button, Form, Input } from 'antd'
import React from 'react'

type Props = {
  isLoading: boolean
  onSubmit: (email: string) => void
}

export const ResetPasswordForm: React.FC<Props> = ({ isLoading, onSubmit }) => {
  const [form] = Form.useForm()

  const handleSubmit = (values: { email: string }) => {
    onSubmit(values.email)
  }

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      layout="vertical"
      requiredMark={false}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Email is required' }]}
      >
        <Input type="email" placeholder="Your email" autoComplete="email" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading} block>
          Reset Password
        </Button>
      </Form.Item>
    </Form>
  )
}
