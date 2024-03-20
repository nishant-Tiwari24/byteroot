'use client'

import { MrbPasswordStrength } from '@web/designSystem'
import { Button, Form, Input } from 'antd'

type Props = {
  isLoading: boolean
  onSubmit: (values: any) => void
}

export const RegisterForm = ({ isLoading, onSubmit }: Props) => {
  const [form] = Form.useForm()

  const handleSubmit = (values: any) => {
    onSubmit(values)
  }

  const password = Form.useWatch('password', form)

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      layout="vertical"
      autoComplete="off"
      requiredMark={false}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Email is required' }]}
      >
        <Input type="email" placeholder="Your email" autoComplete="email" />
      </Form.Item>
      <Form.Item
        name="name"
        rules={[{ required: true, message: 'Name is required' }]}
        label="Name"
      >
        <Input placeholder="Your name" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Password is required' }]}
      >
        <Input.Password
          type="password"
          placeholder="Your password"
          autoComplete="current-password"
        />
      </Form.Item>

      <MrbPasswordStrength value={password} className="mb-3" />

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading} block>
          Register
        </Button>
      </Form.Item>
    </Form>
  )
}
