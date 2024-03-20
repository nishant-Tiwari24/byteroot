'use client'

import { Snackbar } from '@web/designSystem/providers/snackbar'
import { ConfigProvider } from 'antd'
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { ThemeDark } from './theme/theme.dark'

import './style/main.scss'

export type DesignSystemContext = {
  isMobile: boolean
}

const DesignSystemContext = createContext<DesignSystemContext>(undefined)

export const useDesignSystem = (): DesignSystemContext => {
  return useContext(DesignSystemContext)
}

type Props = {
  children: ReactNode
}

export namespace DesignSystem {
  export const Provider: React.FC<Props> = ({ children }) => {
    const [isMobile, setMobile] = useState(false)

    const isWindow = typeof window !== 'undefined'

    const theme = ThemeDark as any

    useEffect(() => {
      if (!isWindow) {
        return
      }

      setMobile(window.innerWidth < 992)

      const handleResize = () => {
        setMobile(window.innerWidth < 992)
      }

      // Attach the event listener
      window.addEventListener('resize', handleResize)

      // Cleanup the event listener on component unmount
      return () => {
        if (!isWindow) {
          return
        }

        window.removeEventListener('resize', handleResize)
      }
    }, [])

    return (
      <ConfigProvider theme={theme}>
        <Snackbar.Provider>
          <DesignSystemContext.Provider value={{ isMobile }}>
            {children}
          </DesignSystemContext.Provider>
        </Snackbar.Provider>
      </ConfigProvider>
    )
  }
}
