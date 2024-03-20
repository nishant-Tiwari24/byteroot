'use client'

import { ConfigurationProvider } from '@web/core/configuration'
import { CoreStoreProvider } from '@web/core/store'
import { DesignSystem, MrbHtml, MrbMain } from '@web/designSystem'
import { useMichelangelo } from '@web/libraries/michelangelo'
import { AuthenticationProvider } from '@web/modules/authentication'
import { GoogleOauth } from '@web/modules/googleOauth'
import { ReactNode } from 'react'
import { SocketProvider } from '../core/socket'
import 'apps/web/src/app/global.css'

export default function AppLayout({ children }: { children: ReactNode }) {
  useMichelangelo()

  return (
    <>
      <MrbHtml>
        <DesignSystem.Provider>
          <ConfigurationProvider>
            <GoogleOauth.Provider>
              <CoreStoreProvider>
                <AuthenticationProvider>
                  <SocketProvider>
                    <MrbMain name="developer challenges">{children}</MrbMain>
                  </SocketProvider>
                </AuthenticationProvider>
              </CoreStoreProvider>
            </GoogleOauth.Provider>
          </ConfigurationProvider>
        </DesignSystem.Provider>
      </MrbHtml>
    </>
  )
}
