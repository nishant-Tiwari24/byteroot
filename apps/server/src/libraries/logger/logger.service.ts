import { Injectable } from '@nestjs/common'
import { WinstonLogger, WinstonService } from './internal/winston.service'
import { Logger } from './logger'

type CreateOptions = {
  name?: string
}

@Injectable()
export class LoggerService {
  private instance: WinstonLogger

  constructor(private winstonService: WinstonService) {
    this.instance = this.winstonService.create()
  }

  create(options?: CreateOptions): Logger {
    return new Logger({ ...options, instance: this.instance })
  }

  log(message: string, data?: Record<string, any>): void {
    this.instance.info(message, { data })
  }

  success(message: string): void {
    this.instance.info(`[SUCCESS] ${message}`)
  }

  error(error: Error | string): void {
    if (typeof error === 'string') {
      this.instance.error(error)
    } else {
      this.instance.error(error.message)
    }
  }
}
