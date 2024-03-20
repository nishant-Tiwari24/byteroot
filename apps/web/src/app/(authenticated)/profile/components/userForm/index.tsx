import { Model } from '@web/domain'
import { Button, Form, Input } from 'antd'
import React from 'react'

type Props = {
  user: Model.User
  isLoading: boolean
  isDisabled: boolean
  onSubmit: (user: Partial<Model.User>) => void
}

export const UserForm: React.FC<Props> = ({
  user,
  isLoading,
  isDisabled,
  onSubmit,
}: Props) => {
  const [form] = Form.useForm()

  const handleSubmit = (values: Partial<Model.User>) => {
    onSubmit(values)
  }

  const initialValues = {
    name: user?.name,
    email: user?.email,
    pictureUrl: user?.pictureUrl,
  }

  return (
    <Form
      form={form}
      initialValues={initialValues}
      onFinish={handleSubmit}
      layout="vertical"
      requiredMark={false}
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: 'Name is required' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Email is required' }]}
      >
        <Input type="email" placeholder="Your email" autoComplete="email" />
      </Form.Item>

      <Form.Item label="Profile picture" name="pictureUrl">
        <Input />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading}
          disabled={isDisabled}
        >
          Save
        </Button>
      </Form.Item>
    </Form>
  )
}
