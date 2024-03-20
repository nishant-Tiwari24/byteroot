import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Button, Space } from 'antd'
import {
  CodeOutlined,
  MessageOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons'
import { Typography } from 'antd'
const { Title, Text, Paragraph } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function ChallengeDetailsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { enqueueSnackbar } = useSnackbar()
  const [challenge, setChallenge] = useState<any>(null)

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const challengeFound = await Api.Challenge.findOne(params.id, {
          includes: ['user'],
        })
        setChallenge(challengeFound)
      } catch (error) {
        enqueueSnackbar('Failed to load challenge details', {
          variant: 'error',
        })
      }
    }

    if (params.id) {
      fetchChallenge()
    }
  }, [params.id])

  const navigateToAttempt = () => {
    router.push(`/challenge/${params.id}/solve`)
  }

  const navigateToDiscussion = () => {
    router.push(`/challenge/${params.id}/discussion`)
  }

  const PlayCircleOutlinedAny: any = PlayCircleOutlined
  const MessageOutlinedAny: any = MessageOutlined

  return (
    <div>
      <Row justify="center">
        <Col>
          <Card style={{ width: '700px' }}>
            <Title level={2}>{challenge?.name}</Title>
            <Text type="secondary">
              By {challenge?.user?.name || 'Unknown author'}
            </Text>
            <Paragraph>
              <Text strong>Description: </Text>
              {challenge?.description || 'No description provided.'}
            </Paragraph>
            <Paragraph>
              <Text strong>Difficulty Level: </Text>
              {challenge?.difficultyLevel}
            </Paragraph>
            <Paragraph>
              <Text strong>Programming Language: </Text>
              {challenge?.programmingLanguage}
            </Paragraph>
            <Paragraph>
              <Text strong>Sample Input: </Text>
              <pre>{challenge?.sampleInput}</pre>
            </Paragraph>
            <Paragraph>
              <Text strong>Sample Output: </Text>
              <pre>{challenge?.sampleOutput}</pre>
            </Paragraph>
            <Space>
              <Button
                icon={<MessageOutlinedAny />}
                onClick={navigateToDiscussion}
              >
                Join Discussion
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
