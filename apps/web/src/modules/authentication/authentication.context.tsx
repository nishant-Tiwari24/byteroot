import { HttpError, HttpService } from '@web/core/http'
import { Model } from '@web/domain'
import {
  AuthenticationHook,
  AuthenticationManager,
} from '@web/domain/authentication'
import { useSnackbar } from 'notistack'
import { createContext, useContext, useEffect, useState } from 'react'

const AuthenticationContext = createContext<Context>(undefined)

/**
 * @provider Authentification
 * @description A provider for the authentification
 * @attribute {boolean} isLoggedIn - Wether the user is logged in or not
 * @attribute {boolean} isAuthenticated - Wether the user is authenticated or not
 * @attribute {Partial<User>} user - The user object, user.id to access the id for example
 * @usage  add 'const authentication = useAuthentication()' , then you can access attributes like that 'const userId = authentication.user?.id'
 * @import import { useAuthentication } from '@web/modules/authentication'
 */

type Context = {
  isLoggedIn: boolean
  isAuthenticated: boolean // for chat gpt
  setUser: (user: Model.User) => void
  login: (user: Model.User) => void
  logout: () => void
  user: Partial<Model.User>
}

type Props = {
  children: JSX.Element
}

function AuthenticationProvider({ children }: Props): JSX.Element {
  const { enqueueSnackbar } = useSnackbar()
  const authenticationToken = AuthenticationHook.useToken()

  const [isLoggedIn, setLoggedIn] = useState(false)
  const [isHttpSetup, setHttpSetup] = useState(false)
  const [dateExpired, setDateExpired] = useState<number>()
  const [isAuthenticated, setAuthenticated] = useState(false)
  const [user, setUser] = useState<Partial<Model.User>>()

  useEffect(() => {
    if (isHttpSetup) {
      return
    }

    HttpService.api.setAccessToken(authenticationToken.getToken())

    HttpService.api.addMiddlewareOnError((response, error) =>
      onErrorHttp(response, error),
    )

    setHttpSetup(true)
  }, [])

  useEffect(() => {
    if (isLoggedIn) {
      enqueueSnackbar(`Your session has expired`)
      logout()
    }
  }, [dateExpired])

  const login = (user: Partial<Model.User>): void => {
    if (!isLoggedIn) {
      setLoggedIn(true)
      setAuthenticated(true)
    }

    setUser(user)
  }

  const logout = (): void => {
    if (isLoggedIn) {
      authenticationToken.removeToken()
      setLoggedIn(false)
      setAuthenticated(false)
    }
  }

  const onErrorHttp = (response: Response, error: HttpError) => {
    const code = HttpError.getCode(error)
    const status = response.status

    const isTokenExpired = AuthenticationManager.isErrorLoggedOut(code, status)

    if (isTokenExpired) {
      setDateExpired(new Date().getTime())
    }
  }

  return (
    <AuthenticationContext.Provider
      value={{ isLoggedIn, isAuthenticated, user, setUser, login, logout }}
    >
      {children}
    </AuthenticationContext.Provider>
  )
}

const useAuthentication = (): Context => {
  return useContext(AuthenticationContext)
}

export { AuthenticationProvider, useAuthentication }
