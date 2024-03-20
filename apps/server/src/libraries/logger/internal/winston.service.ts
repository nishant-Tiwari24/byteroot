import { Injectable } from '@nestjs/common'
import { Logger, createLogger, format, transports } from 'winston'
import { ConfigurationService } from '../../../core/configuration'

export type WinstonLogger = Logger

@Injectable()
export class WinstonService {
  constructor(private configurationService: ConfigurationService) {}

  create(): WinstonLogger {
    const isDevelopment = this.configurationService.isEnvironmentDevelopment()

    if (isDevelopment) {
      return this.createForDevelopment()
    }

    return this.createForProduction()
  }

  private createForDevelopment(): WinstonLogger {
    return createLogger({
      format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
          return `[${timestamp}] [${level}] ${message}`
        }),
      ),
      transports: [new transports.Console()],
    })
  }

  private createForProduction(): WinstonLogger {
    return createLogger({
      format: format.json(),
      transports: [new transports.Console()],
    })
  }
}
