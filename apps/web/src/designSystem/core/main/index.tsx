import { Layout, theme } from 'antd'
import React, { useEffect, useState } from 'react'
import { MrbSplashScreen } from '../splashScreen'

const { useToken } = theme

interface Props {
  name: string
  children: React.ReactNode
}

export const MrbMain: React.FC<Props> = ({ name, children }: Props) => {
  const [isLoading, setLoading] = useState<boolean>(true)

  const { token } = useToken()

  useEffect(() => {
    if (isLoading) {
      setLoading(false)
    }
  }, [])

  return (
    <Layout
      className="mrb-main"
      style={{ background: token.colorBgBase, color: token.colorTextBase }}
    >
      {isLoading ? <MrbSplashScreen name={name} /> : children}
    </Layout>
  )
}
