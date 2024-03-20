import { useConfiguration } from '@web/core/configuration'
import { Button, Flex, Form, Input } from 'antd'

type Props = {
  isLoading: boolean
  onSubmit: (values: { email: string; password: string }) => void
  onResetPassword: () => void
}

export const LoginForm = ({ isLoading, onSubmit, onResetPassword }: Props) => {
  const [form] = Form.useForm()

  const { isEnvironmentDevelopment } = useConfiguration()

  const handleSubmit = (values: { email: string; password: string }) => {
    onSubmit(values)
  }

  const initialValues = { email: null, password: null }

  if (isEnvironmentDevelopment) {
    initialValues.email = 'test@test.com'
    initialValues.password = 'password'
  }

  return (
    <Form
      className="w-full md:w-[28rem] p-4 md:p-0"
      form={form}
      onFinish={handleSubmit}
      layout="vertical"
      initialValues={initialValues}
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

      <Form.Item>
        <Flex justify="end">
          <Button
            type="link"
            onClick={onResetPassword}
            className="text-gray-500 hover:text-gray-800"
          >
            Forgot password?
          </Button>
        </Flex>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="bg-purple-800 w-full"
          loading={isLoading}
        >
          Sign in
        </Button>
      </Form.Item>
    </Form>
  )
}
