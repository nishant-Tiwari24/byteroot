'use client'

import { useEffect, useState } from 'react'
import { useCoreSocket } from './socket.provider'

export const useSocket = (key: string, callback: (data: any) => any) => {
  const { client } = useCoreSocket()

  const [data, setData] = useState<any>()

  useEffect(() => {
    if (client) {
      client.listen(key, data => {
        setData(data)
      })
    }
  }, [client])

  useEffect(() => {
    if (data) {
      callback(data)
      setData(null)
    }
  }, [data])
}
