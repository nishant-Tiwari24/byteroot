import { Model } from '@web/domain'
import { Button, Flex, Form, Input } from 'antd'
import React from 'react'

interface Props {
  user: Model.User
  isLoadingSubmit: boolean
  isLoadingSend: boolean
  onClickSend: () => void
  onSubmit: (keyPrivate: string) => void
}

export const StepCodeInput: React.FC<Props> = ({
  user,
  isLoadingSubmit,
  isLoadingSend,
  onSubmit,
  onClickSend,
}) => {
  const [form] = Form.useForm()

  const handleSubmit = (values: { code: string }) => {
    onSubmit(values.code)
  }

  return (
    <>
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        requiredMark={false}
      >
        <Form.Item
          name="code"
          label={`Enter the code sent to ${user.email}`}
          rules={[{ required: true, message: 'Code is required' }]}
        >
          <Input placeholder="XXXXXX" />
        </Form.Item>

        <Flex justify="space-between">
          <Button type="primary" htmlType="submit" loading={isLoadingSubmit}>
            Verify
          </Button>

          <Button onClick={onClickSend} loading={isLoadingSend}>
            Send Again
          </Button>
        </Flex>
      </Form>
    </>
  )
}
