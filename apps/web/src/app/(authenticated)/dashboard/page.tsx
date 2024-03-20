'use client'
import { DeleteFilled } from '@ant-design/icons'
import { Api } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'
import { useAuthentication } from '@web/modules/authentication'
import { Button, Card, Progress, Statistic } from 'antd'
import { useParams, useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'

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
        console.log(t_Question)
        console.log(userAttemps)
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

  return (
    <PageLayout layout="full-width">
      <Card>
        <Statistic title="Total Question solved" value={userAttemps.length} />
      </Card>
      <Card>
        <Progress
          percent={Math.round(
            (userAttemps.length / totalQuestion.length) * 100,
          )}
          type="circle"
          strokeColor="purple"
        />
      </Card>
      <Card>
        <Progress
          percent={
            Math.round(
              (questionLevel['Easy'] ? questionLevel['Easy'].length : 0) /
                userAttemps.length,
            ) * 100
          }
          strokeColor={'green'}
        />
        <Progress
          percent={
            Math.round(
              (questionLevel['Medium'] ? questionLevel['Medium'].length : 0) /
                userAttemps.length,
            ) * 100
          }
          strokeColor={'red'}
        />
        <Progress
          percent={
            Math.round(
              (questionLevel['Hard'] ? questionLevel['Hard'].length : 0) /
                userAttemps.length,
            ) * 100
          }
          strokeColor={'blue'}
        />
      </Card>
      <Card>
        {userPostQuestion.map((Name, i) => (
          <Card key={i} className="flex justify-between w-full">
            <React.Fragment key={Name.id}>{Name.name}</React.Fragment>
            <Button>
              <DeleteFilled
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
            </Button>
          </Card>
        ))}
      </Card>

      <Card>
        {userAttemps.map((Name, i) => (
          <Card key={i}>
            <React.Fragment key={Name.id}>{Name.challengeId}</React.Fragment>
          </Card>
        ))}
      </Card>
    </PageLayout>
  )
}
