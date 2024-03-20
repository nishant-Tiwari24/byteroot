import { Layout, Typography } from 'antd'
import React, { useEffect, useState } from 'react'

interface Props {
  name: string
}

export const MrbSplashScreen: React.FC<Props> = ({ name }: Props) => {
  const [isPageInitialised, setPageInitialised] = useState(false)

  useEffect(() => {
    setPageInitialised(true)
  }, [])

  if (!isPageInitialised) {
    return null
  }

  return (
    <Layout
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography style={{ letterSpacing: '3px' }}>{name}</Typography>
      {/* Ant Design default text color */}
    </Layout>
  )
}
