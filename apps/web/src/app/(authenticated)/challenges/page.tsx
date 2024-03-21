'use client'
import {
  CodeOutlined,
  HeartFilled,
  LikeFilled,
  LikeOutlined,
} from '@ant-design/icons'
import { Api } from '@web/domain'
import { Card, Col, Row, Select, Statistic, Typography } from 'antd'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import Footer from '../home/components/Footer'
const { Title, Text } = Typography
const { Option } = Select

export default function ExploreChallengesPage() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const [challenges, setChallenges] = useState([])
  const [difficulty, setDifficulty] = useState('')
  const [language, setLanguage] = useState('')

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const challengesFound = await Api.Challenge.findMany({
          filters: {
            difficultyLevel: difficulty ? { eq: difficulty } : undefined,
            programmingLanguage: language ? { eq: language } : undefined,
          },
          includes: ['user'],
        })
        setChallenges(challengesFound)
      } catch (error) {
        enqueueSnackbar('Failed to fetch challenges', { variant: 'error' })
      }
    }

    fetchChallenges()
  }, [difficulty, language])
  const [likes, setLikes] = useState(0)
  const handleLike = () => {
    setLikes(likes + 1)
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-screen-xl mx-auto px-4">
        <Title>Explore Coding Challenges</Title>
        <Text>
          Discover challenges posted by the community, filter by difficulty or
          programming language.
        </Text>
        <div className="mt-8">
          <Select
            placeholder="Select Difficulty"
            className="w-48 mr-4 text-green-600"
            onChange={value => setDifficulty(value)}
            allowClear
          >
            <Option value="Easy">Easy</Option>
            <Option value="Medium">Medium</Option>
            <Option value="Hard">Hard</Option>
          </Select>
          <Select
            placeholder="Select Languages"
            className="w-48 text-green-600 border-1"
            onChange={value => setLanguage(value)}
            allowClear
          >
            <Option value="Python">Python</Option>
            <Option value="JavaScript">JavaScript</Option>
            <Option value="Java">Java</Option>
          </Select>
        </div>
      </div>
      <div className="max-w-screen-xl  mx-auto px-4 mt-4">
        <Row gutter={[16, 16]}>
          {challenges?.map(challenge => (
            <Col key={challenge.id} xs={24} sm={24} md={24} lg={24}>
              <Card
                hoverable
                actions={[
                  <Col span={8} className="text-sm">
                    <Statistic
                      className="hover:text-blue-400"
                      prefix={
                        <HeartFilled
                          value={likes}
                          className="hover:text-red-500 focus:text-red-500 w-4 h-4"
                          onClick={handleLike}
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                        />
                      }
                    />
                  </Col>,
                  <CodeOutlined
                    key="code"
                    className="text-green-400 hover:text-blue-500 cursor-pointer"
                    onClick={() => router.push(`/challenge/${challenge.id}`)}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  />,
                ]}
                className="mb-4 bg-zinc-900"
              >
                <div>
                  <Title className="text-xl">{challenge.name}</Title>
                  <Text className="text-lg">
                    Description: {challenge.description}
                  </Text>
                  <div className="mt-2">
                    <Text strong className="text-green-400">
                      Difficulty:
                    </Text>{' '}
                    {challenge.difficultyLevel}
                    <br />
                    <Text strong className="text-green-400">
                      Language:
                    </Text>{' '}
                    {challenge.programmingLanguage}
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      <Footer />
    </div>
  )
}
