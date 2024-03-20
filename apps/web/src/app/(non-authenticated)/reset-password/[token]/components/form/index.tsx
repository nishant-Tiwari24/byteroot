import { Button, Form, Input, message } from 'antd'
import React from 'react'

type Props = {
  isLoading: boolean
  onSubmit: (password: string) => void
}

export const FormToken: React.FC<Props> = ({ isLoading, onSubmit }) => {
  const [form] = Form.useForm()

  const handleSubmit = (values: {
    password: string
    passwordConfirmation: string
  }) => {
    if (values.password !== values.passwordConfirmation) {
      message.error('Password and confirmation must match.')
      return
    }

    onSubmit(values.password)
  }

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      layout="vertical"
      requiredMark={false}
    >
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Password is required' }]}
      >
        <Input.Password
          type="password"
          placeholder="Your new password"
          autoComplete="current-password"
        />
      </Form.Item>

      <Form.Item
        label="Password confirmation"
        name="passwordConfirmation"
        rules={[
          { required: true, message: 'Password confirmation is required' },
        ]}
      >
        <Input.Password
          type="password"
          placeholder="Password confirmation"
          autoComplete="current-password"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading} block>
          Reset Password
        </Button>
      </Form.Item>
    </Form>
  )
}
