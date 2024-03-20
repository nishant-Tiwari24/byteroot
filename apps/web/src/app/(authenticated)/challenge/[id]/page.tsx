'use client'

import { MessageOutlined, PlayCircleOutlined } from '@ant-design/icons'
import { Api } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'
import { Button, Card, Col, Row, Space, Typography } from 'antd'
import { useParams, useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
const { Title, Text, Paragraph } = Typography

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

  // Temporary fix to bypass the detailed property checks for icons
  const PlayCircleOutlinedAny: any = PlayCircleOutlined
  const MessageOutlinedAny: any = MessageOutlined

  return (
    <PageLayout layout="full-width">
      <div>
        <Row justify="center">
          <Col>
            <Card>
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
                  type="primary"
                  icon={<PlayCircleOutlinedAny />}
                  onClick={navigateToAttempt}
                >
                  Attempt Challenge
                </Button>
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
    </PageLayout>
  )
}