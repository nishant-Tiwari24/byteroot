'use client'

import { UploadOutlined } from '@ant-design/icons'
import { Api } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'
import { useAuthentication } from '@web/modules/authentication'
import { Button, Card, Col, Input, Row, Typography, Upload } from 'antd'
import dayjs from 'dayjs'
import { useParams, useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
const { Title, Text, Paragraph } = Typography

export default function ChallengeDiscussionPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [challenge, setChallenge] = useState<any>(null)
  const [discussions, setDiscussions] = useState<any[]>([])
  const [content, setContent] = useState('')
  const [fileList, setFileList] = useState<any[]>([])

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const challengeFound = await Api.Challenge.findOne(params.id, {
          includes: ['user', 'discussions.user'],
        })
        setChallenge(challengeFound)
        setDiscussions(challengeFound.discussions || [])
      } catch (error) {
        enqueueSnackbar('Failed to fetch challenge details', {
          variant: 'error',
        })
      }
    }

    fetchChallenge()
  }, [params.id])

  const handleUpload = async (options: any) => {
    const { file } = options
    try {
      const url = await Api.Upload.upload(file)
      setFileList(fileList => [...fileList, { url: url, status: 'done' }])
      enqueueSnackbar('File uploaded successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to upload file', { variant: 'error' })
    }
  }

  const handleCreateDiscussion = async () => {
    try {
      await Api.Discussion.createOneByChallengeId(params.id, {
        content,
        userId,
      })
      enqueueSnackbar('Discussion added successfully', { variant: 'success' })
      setContent('')
      setFileList([])
    } catch (error) {
      enqueueSnackbar('Failed to add discussion', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="full-width">
      <Row justify="center">
        <Col span={24}>
          <Title level={2}>Challenge Discussion</Title>
          <Paragraph>
            Discuss approaches and solutions for the challenge:{' '}
            <Text strong>{challenge?.name}</Text>
          </Paragraph>
        </Col>
        <Col span={24}>
          <Input.TextArea
            rows={4}
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Share your thoughts or solutions..."
          />
          <Upload fileList={fileList} customRequest={handleUpload} maxCount={1}>
            <Button
              icon={
                <UploadOutlined
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                />
              }
            >
              Upload Solution File
            </Button>
          </Upload>
          <Button
            type="primary"
            onClick={handleCreateDiscussion}
            style={{ marginTop: '10px' }}
          >
            Submit Discussion
          </Button>
        </Col>
        <Col span={24} style={{ marginTop: '20px' }}>
          {discussions?.map(discussion => (
            <Card key={discussion.id} style={{ marginBottom: '10px' }}>
              <Text strong>{discussion.user?.name || 'Anonymous'}:</Text>
              <Paragraph>{discussion.content}</Paragraph>
              <Text type="secondary">
                {dayjs(discussion.dateCreated).format('DD MMM YYYY')}
              </Text>
            </Card>
          ))}
        </Col>
      </Row>
    </PageLayout>
  )
}
