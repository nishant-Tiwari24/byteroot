'use client'

import { UploadOutlined } from '@ant-design/icons'
import { Api } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'
import { useAuthentication } from '@web/modules/authentication'
import { Button, Form, Input, Select, Typography, Upload } from 'antd'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import Footer from '../../home/components/Footer'
const { Title, Text } = Typography
const { Option } = Select

export default function PostChallengePage() {
  const router = useRouter()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [form] = Form.useForm()
  const [fileList, setFileList] = useState([])

  const handleUpload = async options => {
    const { file } = options
    const url = await Api.Upload.upload(file)
    setFileList(fileList => [...fileList, { url: url, status: 'done' }])
  }

  const onFinish = async values => {
    try {
      await Api.Challenge.createOneByUserId(userId, {
        ...values,
        imageUrl: fileList.length > 0 ? fileList[0].url : undefined,
        userId,
      })
      enqueueSnackbar('Challenge submitted successfully', {
        variant: 'success',
      })
      router.push('/challenges')
    } catch (error) {
      enqueueSnackbar('Failed to submit challenge', { variant: 'error' })
    }
    const prompt = `Challenge Name: ${values.name}\nDescription: ${values.description}\nSample Input: ${values.sampleInput}\nSample Output: ${values.sampleOutput}\nDifficulty Level: ${values.difficultyLevel}\nProgramming Language: ${values.programmingLanguage}\n\nDo you want to submit this challenge?`

    console.log(prompt)
  }

  return (
    <div className="w-full flex justify-center">
      <div className="mt-10 w-[1200px] border-2 border-zinc-800 bg-gradient-to-br from-black to-zinc-800 shadow-lg p-8 py-4 rounded-lg bg-zinc-900">
        <div style={{ maxWidth: '1100px', margin: 'auto' }}>
          <Title
            className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50"
            level={3}
            style={{ fontSize: '1.5rem', marginBottom: '1rem' }}
          >
            Submit a New Coding Challenge
          </Title>
          <Text style={{ fontSize: '1rem', marginBottom: '1rem' }}>
            Share your coding challenge with the community.
          </Text>{' '}
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            style={{ marginTop: '20px' }}
          >
            <Form.Item
              name="name"
              label="Challenge Name"
              rules={[{ required: true }]}
            >
              <Input style={{ fontSize: '1rem' }} />
            </Form.Item>

            <Form.Item name="description" label="Description">
              <Input.TextArea rows={4} style={{ fontSize: '1rem' }} />
            </Form.Item>

            <Form.Item
              name="sampleInput"
              label="Sample Input"
              rules={[{ required: true }]}
            >
              <Input style={{ fontSize: '1rem' }} />
            </Form.Item>

            <Form.Item
              name="sampleOutput"
              label="Sample Output"
              rules={[{ required: true }]}
            >
              <Input style={{ fontSize: '1rem' }} />
            </Form.Item>

            <Form.Item
              name="difficultyLevel"
              label="Difficulty Level"
              rules={[{ required: true }]}
            >
              <Select style={{ fontSize: '1rem' }}>
                <Option value="Easy">Easy</Option>
                <Option value="Medium">Medium</Option>
                <Option value="Hard">Hard</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="programmingLanguage"
              label="Programming Language"
              rules={[{ required: true }]}
            >
              <Input style={{ fontSize: '1rem' }} />
            </Form.Item>

            <Form.Item label="Image">
              <Upload
                fileList={fileList}
                customRequest={handleUpload}
                maxCount={1}
              >
                <Button
                  icon={
                    <UploadOutlined
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    />
                  }
                  style={{ fontSize: '1rem' }} // Custom font size for Button
                >
                  Click to Upload
                </Button>
              </Upload>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="bg-green-500 rounded-md"
                style={{ fontSize: '1rem' }} // Custom font size for Button
                onSelect={onFinish}
              >
                Submit Challenge
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <Footer />
    </div>
  )
}
