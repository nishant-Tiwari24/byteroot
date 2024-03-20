import { Box, Button, Text, useToast } from '@chakra-ui/react'
import { Api } from '@web/domain'
import { useAuthentication } from '@web/modules/authentication'
import { executeCode } from 'apps/server/src/modules/solve/api.js'
import { useParams, useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import QuestionData from './QuestionDetails'

const Output = ({ editorRef, language }) => {
  const toast = useToast()
  const [output, setOutput] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmititng, setIsSubmiting] = useState(false)
  const [isError, setIsError] = useState(false)
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()
  const params = useParams<any>()
  const [challengName, setChallengeName] = useState<any>(null)

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const challengeFound = await Api.Challenge.findOne(params.id, {
          includes: ['user'],
        })
        console.log(challengeFound)
        setChallengeName(challengeFound)
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

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue()

    if (!sourceCode) return
    try {
      setIsLoading(true)
      const { run: result } = await executeCode(language, sourceCode)
      setOutput(result.output.split('\n'))
      result.stderr ? setIsError(true) : setIsError(false)
    } catch (error) {
      console.log(error)
      toast({
        title: 'An error occurred.',
        description: error.message || 'Unable to run code',
        status: 'error',
        duration: 6000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const submit = async () => {
    try {
      setIsSubmiting(true)
      await Api.Attempt.createOneByChallengeId(params.id, {
        userId: userId!,
      })
      enqueueSnackbar('Solution submitted successfully', { variant: 'success' })
      router.push(`/challenges/${params.id}`)
    } catch (error) {
      enqueueSnackbar('Failed to submit solution', { variant: 'error' })
    } finally {
      setIsSubmiting(false)
    }

    try {
      if (output[0] === challengName?.sampleOutput) {
        enqueueSnackbar('Solution submitted successfully', {
          variant: 'success',
        })
      } else {
        throw new Error('Wrong answer')
      }
    } catch (error) {
      enqueueSnackbar('Failed to submitted successfully', {
        variant: 'error',
      })
    }
  }

  return (
    <Box w="35%">
      <Text className="text-2xl">Output:</Text>
      <QuestionData />
      <Box
        height="25vh"
        p={2}
        color={isError ? 'red.400' : ''}
        border="1px solid"
        borderRadius={4}
        borderColor={isError ? 'red.500' : '#333'}
      >
        {output
          ? output.map((line, i) => <Text key={i}>{line}</Text>)
          : 'Click "Run Code" to see the output here'}
      </Box>
      <Button
        variant="outline"
        colorScheme="green"
        mb={4}
        isLoading={isLoading}
        onClick={runCode}
      >
        Run Code
      </Button>

      <Button
        variant="outline"
        colorScheme="green"
        mb={4}
        isLoading={isSubmititng}
        onClick={submit}
      >
        Submit
      </Button>
    </Box>
  )
}

export default Output
