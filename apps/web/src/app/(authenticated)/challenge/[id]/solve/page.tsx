'use client'

import { PageLayout } from '@web/layouts/Page.layout'
import { useAuthentication } from '@web/modules/authentication'
import { useParams, useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { Box } from '@chakra-ui/react'
import CodeEditor from './components/CodeEditor'
import Footer from '@web/app/(authenticated)/home/components/Footer'

export default function SolveChallengePage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  return (
    <PageLayout layout="full-width">
      <Box minH="85vh" bg="#0f0a19" color="gray.500" px={6} py={8}>
        <CodeEditor />
      </Box>
      <Footer />
    </PageLayout>
  )
}
