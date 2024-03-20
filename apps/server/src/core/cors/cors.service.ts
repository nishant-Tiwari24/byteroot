import { Injectable } from '@nestjs/common'
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'
import {
  ConfigurationService,
  ConfigurationServiceObject,
} from '../configuration'

@Injectable()
export class CorsService {
  constructor(private configurationService: ConfigurationService) {}

  getOptions() {
    const clientBaseUrl = this.configurationService.getClientBaseUrl()

    const options: Record<ConfigurationServiceObject.Environment, CorsOptions> =
      {
        [ConfigurationServiceObject.Environment.DEVELOPMENT]: {
          origin: [clientBaseUrl],
          credentials: true,
        },
        [ConfigurationServiceObject.Environment.PRODUCTION]: {
          origin: clientBaseUrl,
          credentials: true,
        },
      }

    const environment = this.configurationService.getEnvironment()

    const value = options[environment]
    const valueDefault =
      options[ConfigurationServiceObject.Environment.DEVELOPMENT]

    return value ?? valueDefault
  }
}
