import { useCoreStore } from '@web/core/store'
import { MrbSplashScreen } from '@web/designSystem'
import { Api } from '@web/domain'
import { AuthenticationHook } from '@web/domain/authentication'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'
import { RouterObject } from '../../core/router'
import { GlobalService } from '../global'
import { useAuthentication } from './authentication.context'

type Props = {
  children: ReactNode
  isPublic?: boolean
}

function AuthenticationGuard({ children, isPublic }: Props): ReactNode {
  const authentication = useAuthentication()
  const store = useCoreStore()
  const pathname = usePathname()
  const router = useRouter()

  const authenticationToken = AuthenticationHook.useToken()

  const [isLoading, setLoading] = useState(true)
  const [pathRedirected, setPathRedirected] = useState<string>()
  const [isRedirected, setRedirected] = useState(false)

  const handlePublic = async () => {
    if (authentication.isLoggedIn) {
      router.replace(RouterObject.route.HOME)

      setPathRedirected(RouterObject.route.HOME)

      return
    }

    setLoading(true)

    try {
      const { token } = await Api.Authentication.refresh()

      authenticationToken.setToken(token)

      const user = await Api.User.findMe()

      await GlobalService.initialiseStore({ store })

      authentication.login(user)

      router.replace(RouterObject.route.HOME)

      setPathRedirected(RouterObject.route.HOME)
    } catch (error) {
      authentication.logout()

      await GlobalService.cleanStore({ store })

      setRedirected(true)

      setLoading(false)
    }
  }

  const handleProtected = async () => {
    if (authentication.isLoggedIn) {
      setLoading(false)

      setRedirected(true)

      return
    }

    setLoading(true)

    try {
      const { token } = await Api.Authentication.refresh()

      authenticationToken.setToken(token)

      const user = await Api.User.findMe()

      await GlobalService.initialiseStore({ store })

      authentication.login(user)

      setLoading(false)

      setRedirected(true)
    } catch (error) {
      authentication.logout()

      await GlobalService.cleanStore({ store })

      router.replace(RouterObject.route.LOGIN)

      setPathRedirected(RouterObject.route.LOGIN)
    }
  }

  useEffect(() => {
    if (isPublic) {
      handlePublic()
    } else {
      handleProtected()
    }
  }, [isPublic, authentication.isLoggedIn])

  useEffect(() => {
    if (!isLoading) {
      const isReady = pathname === pathRedirected

      if (isReady) {
        setRedirected(true)
      }
    }
  }, [isLoading, pathname])

  return (
    <>
      {isLoading || !isRedirected ? (
        <MrbSplashScreen name="developer challenges" />
      ) : (
        children
      )}
    </>
  )
}

export { AuthenticationGuard }
