'use client'
import { DeleteFilled } from '@ant-design/icons'
import { Flex } from '@chakra-ui/react'
import { Api } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'
import { useAuthentication } from '@web/modules/authentication'
import { Button, Card, Progress, Statistic, Typography } from 'antd'
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

  return (
    <PageLayout layout="full-width">
      <Card>
        <Flex
          className="flex flex-row justify-around align-middle"
          style={{ backgroundColor: '' }}
        >
          <div>
            <Statistic
              title="Total Question Solved"
              className="text-green-400"
              value={userAttemps.length}
            />
          </div>
          <div>
            <Statistic
              title="Total Question Posted"
              className="text-yellow-400"
              value={userPostQuestion.length}
            />
          </div>
          <div>
            <Statistic
              title="Total Question Attempted"
              className="text-red-400"
              value={userAttemps.length}
            />
          </div>
        </Flex>
      </Card>
      <Card>
        {userPostQuestion.map((Name, i) => (
          <Card key={i} className="flex justify-between w-full">
            <React.Fragment key={Name.id}>
              <h1 className="text-2xl">Question name: {Name.name}</h1>
              <br />
              <p>Question description: {Name.description}</p>
            </React.Fragment>
            <Button onClick={() => Delete(Name.id)}>
              <DeleteFilled
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
            </Button>
          </Card>
        ))}
      </Card>
    </PageLayout>
  )
}
