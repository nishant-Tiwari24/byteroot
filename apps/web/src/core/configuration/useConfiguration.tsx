/**
 * @provider Configuration
 * @description A useConfiguration provider to retrieve .env variables
 * @import import { useConfiguration } from '@web/core/configuration'
 * @usage { envVariable } = useConfiguration()
 */

import { Utility } from '@web/libraries/utility'
import { ConfigurationType } from '@web/pages/api/configuration'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { HttpService } from '../http'

export type ConfigurationContextType = {
  isEnvironmentProduction: boolean
  isEnvironmentDevelopment: boolean
  isMarblismMichelangeloActive: boolean
  localEmailServerUrl: string
  apiBaseUrl: string
  googleClientId?: string
  toolBaseUrl?: string
  mapboxAccessToken?: string
}

const ConfigurationContext = createContext<ConfigurationContextType>(undefined)

export const useConfiguration = (): ConfigurationContextType => {
  return useContext(ConfigurationContext)
}

type Props = {
  children: ReactNode
}

export const ConfigurationProvider: React.FC<Props> = ({ children }) => {
  const [isLoading, setLoading] = useState<boolean>(true)
  const [values, setValues] = useState<ConfigurationType>({})

  let apiBaseUrl: string = values.API_BASE_URL ?? 'http://localhost:3099'

  useEffect(() => {
    fetch('/api/configuration')
      .then(res => res.json())
      .then((configuration: ConfigurationType) => {
        setValues(configuration)

        const apiBaseUrlRaw =
          configuration.API_BASE_URL ?? 'http://localhost:3099'

        apiBaseUrl = Utility.removeTrailingSlash(apiBaseUrlRaw) + '/api'

        HttpService.api.setBaseUrl(apiBaseUrl)
      })
      .catch(error =>
        console.error(`Could not fetch configuration: ${error.message}`),
      )
      .finally(() => setLoading(false))
  }, [])

  const environment = values.NODE_ENV ?? 'development'
  const isEnvironmentProduction = environment === 'production'
  const isEnvironmentDevelopment = environment === 'development'
  const localEmailServerUrl = 'http://localhost:8022'
  const googleClientId = values.GOOGLE_CLIENT_ID
  const toolBaseUrl = values.TOOL_BASE_URL
  const mapboxAccessToken = values.MAPBOX_ACCESS_TOKEN
  const isMarblismMichelangeloActive =
    values.MARBLISM_MICHELANGELO_ACTIVE && !isEnvironmentProduction

  return (
    <ConfigurationContext.Provider
      value={{
        isEnvironmentProduction,
        isEnvironmentDevelopment,
        localEmailServerUrl,
        apiBaseUrl,
        googleClientId,
        toolBaseUrl,
        isMarblismMichelangeloActive,
        mapboxAccessToken,
      }}
    >
      {!isLoading && children}
    </ConfigurationContext.Provider>
  )
}
