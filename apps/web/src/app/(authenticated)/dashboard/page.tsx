'use client'
import { DeleteFilled } from '@ant-design/icons'
import { Flex } from '@chakra-ui/react'
import { Api } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'
import { useAuthentication } from '@web/modules/authentication'
import { Button, Card, Progress, Statistic, Typography } from 'antd'
import { useParams, useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { ContributionCalendar } from 'react-contribution-calendar'
import Footer from '../home/components/Footer'

interface Item {
  id: number // Assuming id is of type number
  // Add other properties if necessary
}

export default function MyDashboardPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [userAttemps, setUserAttemps] = useState([])
  const [totalQuestion, setTotalQuestion] = useState([])
  const [userPostQuestion, setUserPostQuestion] = useState([])
  // const [questionNames, setQuestionNames] = useState({})

  useEffect(() => {
    async function challengedata() {
      try {
        const userChallenge = await Api.Challenge.findManyByUserId(userId)
        const t_Question = await Api.Challenge.findMany()
        const userattemps = await Api.Attempt.findManyByUserId(userId)
        // console.log(t_Question)
        console.log(userattemps)
        setUserPostQuestion(userChallenge)
        setTotalQuestion(t_Question)
        setUserAttemps(userattemps)
      } catch (error) {
        enqueueSnackbar('Failed to fetch challenges', { variant: 'error' })
      }
    }
    challengedata()
  }, [userId])

  // divide question by level
  const questionLevel = userAttemps.reduce(
    (result: any, currentQuestion: any) => {
      ;(result[currentQuestion['difficultyLevel']] =
        result[currentQuestion['difficultyLevel']] || []).push(currentQuestion)
      return result
    },
    {},
  )
  // console.log(questionLevel['undefined'])
  const Delete = async values => {
    try {
      await Api.Challenge.deleteOne(values)
      enqueueSnackbar('Question successfully deleted', { variant: 'success' })
      location.reload()
    } catch (error) {
      enqueueSnackbar('Failed to delete challenges', { variant: 'error' })
    }
  }

  const data = [
    {
      '2020-04-20': { level: 2 },
    },
    {
      '2023-07-08': { level: 1 },
    },
    {
      '2023-07-09': { level: 4, data: {} },
    },
    {
      '2023-03-31': {
        level: 3,
        data: {
          myKey: 'my data',
        },
      },
    },
  ]

  return (
    <PageLayout layout="full-width">
      <Card className="bg-zinc-900">
        <Flex
          className="flex flex-row justify-around align-middle"
          style={{ backgroundColor: '' }}
        >
          <div>
            <Statistic
              title="Total Progress"
              className="text-blue-500"
              value={Math.round(
                (userPostQuestion.length / totalQuestion.length) * 100,
              )}
              valueStyle={{ color: '#3f8600' }}
              suffix="%"
            />
          </div>
          <div>
            <Statistic
              title="Total Question Solved"
              className="text-green-400"
              value={userAttemps.length}
              valueStyle={{ color: '#3f8600' }}
            />
          </div>
          <div>
            <Statistic
              title="Total Question Posted"
              className="text-blue-500"
              value={userPostQuestion.length}
              valueStyle={{ color: '#3f8600' }}
            />
          </div>
        </Flex>
      </Card>

      <Flex className="flex flex-col md:flex-row justify-around items-center h-96 mt-8 md:mt-0">
        <div className="mb-6 md:mb-0 md:mr-8 text-center">
          <Progress
            percent={Math.round(
              (userAttemps.length / totalQuestion.length) * 100,
            )}
            type="circle"
            strokeColor="puple"
            width={230}
            trailColor="gray"
            strokeLinecap="butt"
          />
          <Typography.Text style={{ marginTop: '10px', display: 'block' }}>
            Total Questions Solved
          </Typography.Text>
        </div>
        <div className="w-full md:w-1/2">
          <div className="mb-4">
            <Progress
              percent={Math.round(
                ((questionLevel['Easy'] ? questionLevel['Easy'].length : 0) /
                  userAttemps.length) *
                  100,
              )}
              strokeColor={'green'}
              style={{ marginRight: '10px' }}
              width={200}
            />
            <Typography.Text className="text-green-400">Easy</Typography.Text>
          </div>
          <div className="mb-4">
            <Progress
              percent={Math.round(
                ((questionLevel['Medium']
                  ? questionLevel['Medium'].length
                  : 0) /
                  userAttemps.length) *
                  100,
              )}
              strokeColor={'yellow'}
              style={{ marginRight: '10px' }}
            />
            <Typography.Text className="text-yellow-400">
              Medium
            </Typography.Text>
          </div>
          <div className="">
            <Progress
              percent={Math.round(
                ((questionLevel['Hard'] ? questionLevel['Hard'].length : 0) /
                  userAttemps.length) *
                  100,
              )}
              strokeColor={'red'}
              style={{ marginRight: '10px' }}
              width={200}
            />
            <Typography.Text className="text-red-400">Hard</Typography.Text>
          </div>
        </div>
      </Flex>

      <h1 className="text-2xl font-semibold mt-6 md:mb-8 text-gray-400 px-4">
        User Activity in the last month
      </h1>
      <ContributionCalendar
        data={data}
        start="2023-04-04"
        end="2024-11-19"
        daysOfTheWeek={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
        textColor="gray"
        startsOnSunday={true}
        includeBoundary={true}
        theme="dark_grass"
        cx={18}
        cy={18}
        cr={4}
        onCellClick={(e, data) => console.log(data)}
        scroll={false}
      />

      <h1 className="text-2xl text-gray-400 font-semibold mt-8 md:mt-12 px-4">
        Question posted by user
      </h1>

      <div className="mt-4 px-4 md:px-0">
        {userPostQuestion.map((Name, i) => (
          <div
            key={i}
            className="flex justify-between items-center w-full gap-4"
          >
            <div className="w-full">
              <Card>
                <Flex justify="space-between" className="p-2">
                  <h1 className="text-xl md:text-2xl text-yellow-300 inline-block">
                    Question name:{' '}
                    <p className="text-xl text-gray-200">{Name.description}</p>
                  </h1>
                  <div className="flex align-middle justify-around">
                    <Button onClick={() => Delete(Name.id)} className="">
                      {' '}
                      Delete
                      <DeleteFilled
                        style={{ color: 'red' }}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      />
                    </Button>
                  </div>
                </Flex>
              </Card>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </PageLayout>
  )
}
