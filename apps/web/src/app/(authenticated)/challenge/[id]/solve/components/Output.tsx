import { Box, Button, Text, useToast } from '@chakra-ui/react'
import { Api } from '@web/domain'
import { useAuthentication } from '@web/modules/authentication'
import { Flex, Form } from 'antd'
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
  const [form] = Form.useForm()

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const challengeFound = await Api.Challenge.findOne(params.id, {
          includes: ['user'],
        })
        // console.log(challengeFound)
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

  const submit = async values => {
    try {
      setIsSubmiting(true)
      if (output[0] !== challengName?.sampleOutput) {
        throw new Error('Wrong answer')
      }
      // await Api.Attempt.createOneByChallengeId(params.id, {
      //   // value: values.name,
      //   userId: userId!,
      // })
      enqueueSnackbar('Solution submitted successfully', { variant: 'success' })
      router.push(`/challenges/${params.id}`)
    } catch (error) {
      enqueueSnackbar('Incorrect Output! Failed to submit solution', {
        variant: 'error',
      })
    } finally {
      setIsSubmiting(false)
    }

    // try {
    //   if (output[0] === challengName?.sampleOutput) {
    //     enqueueSnackbar('Solution submitted successfully', {
    //       variant: 'success',
    //     })
    //   } else {
    //     throw new Error('Wrong answer')
    //   }
    // } catch (error) {
    //   enqueueSnackbar('Failed to submitted successfully', {
    //     variant: 'error',
    //   })
    // }
  }

  return (
    <Box w="35%">
      <QuestionData />
      <Box
        height="25vh"
        p={8}
        color={isError ? 'red.400' : ''}
        border="1px solid"
        borderRadius={4}
        borderColor={isError ? 'red.500' : '#333'}
        className="bg-zinc-800"
      >
        {output
          ? output.map((line, i) => <Text key={i}>{line}</Text>)
          : 'Click "Run Code" to see the output here'}
      </Box>
      <Flex justify="space-between -pt-4">
        <Button
          variant="outline"
          colorScheme="green"
          isLoading={isLoading}
          onClick={runCode}
          flex="1"
          mr={4}
          className="bg-green-400 text-black p-1 rounded-md"
        >
          Run Code
        </Button>
        <Button
          variant="outline"
          colorScheme="green"
          isLoading={isSubmititng}
          onClick={submit}
          flex="1"
          ml={4}
          className="bg-yellow-400 text-black p-1 rounded-md"
        >
          Submit
        </Button>
      </Flex>
    </Box>
  )
}

export default Output
