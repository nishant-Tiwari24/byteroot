'use client'

import { UploadOutlined } from '@ant-design/icons'
import { Api } from '@web/domain'
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
      const prompt = `name:${values.name}\ndescription:${values.description}\n
      sampleinput:${values.sampleInput}\nsampleoutput:${values.sampleOutput}\n
      dificultylevel:${values.difficultyLevel}\nprogramminglanguage:${values.programmingLanguage}
      is this a valid coding question answer this in Yes or No`
      const res = await Api.Ai.chat(prompt)
      console.log(res)
      if (res != 'Yes') {
        throw new Error('Not a valid question')
      }
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
  }

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="mt-10 w-[1200px] border-2 border-zinc-800 bg-gradient-to-br from-black to-zinc-800 shadow-lg p-8 py-4 rounded-lg bg-zinc-900">
          <div style={{ maxWidth: '1100px', margin: 'auto' }}>
            <h1
              className="font-robo font-semibold text-green-400"
              style={{ fontSize: '2rem', marginBottom: '1rem' }}
            >
              Submit a New Coding Challenge
            </h1>
            <p
              style={{ fontSize: '1rem', marginBottom: '1rem' }}
              className="font-mono "
            >
              Share your coding challenge with the community.
            </p>{' '}
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              style={{ marginTop: '20px' }}
            >
              <Form.Item
                name="name"
                label="Challenge Name"
                className=""
                rules={[{ required: false }]}
              >
                <Input style={{ fontSize: '1rem' }} />
              </Form.Item>

              <Form.Item name="description" label="Description">
                <Input.TextArea rows={4} style={{ fontSize: '1rem' }} />
              </Form.Item>

              <Form.Item
                name="sampleInput"
                label="Sample Input"
                rules={[{ required: false }]}
              >
                <Input style={{ fontSize: '1rem' }} />
              </Form.Item>

              <Form.Item
                name="sampleOutput"
                label="Sample Output"
                rules={[{ required: false }]}
              >
                <Input style={{ fontSize: '1rem' }} />
              </Form.Item>

              <Form.Item
                name="difficultyLevel"
                label="Difficulty Level"
                rules={[{ required: false }]}
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
                rules={[{ required: false }]}
              >
                <Input style={{ fontSize: '1rem' }} />
              </Form.Item>
              <div className="flex justify-between">
                <Form.Item label="">
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
              </div>
            </Form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
