import { useAuthentication } from '@web/modules/authentication'
import React, { ReactNode, createContext, useContext, useState } from 'react'
import { useConfiguration } from '../configuration'
import { SocketClient } from './socket.client'

type Context = {
  client: SocketClient
}

const SocketContext = createContext<Context>(undefined)

type Props = {
  children: ReactNode
}

export const SocketProvider: React.FC<Props> = ({ children }): ReactNode => {
  const authentication = useAuthentication()

  const { apiBaseUrl: baseUrl } = useConfiguration()

  const token = authentication?.user?.id

  const [client, setClient] = useState<SocketClient>()

  // useEffect(() => {
  //   const userId = authentication?.user?.id

  //   if (userId) {
  //     setClient(new SocketClient({ baseUrl, token }))
  //   } else if (client) {
  //     client.stop()

  //     setClient(null)
  //   }

  //   return () => {
  //     if (client) {
  //       client.stop()

  //       setClient(null)
  //     }
  //   }
  // }, [authentication?.user?.id])

  return (
    <SocketContext.Provider value={{ client }}>
      {children}
    </SocketContext.Provider>
  )
}

export const useCoreSocket = (): Context => {
  return useContext(SocketContext)
}
