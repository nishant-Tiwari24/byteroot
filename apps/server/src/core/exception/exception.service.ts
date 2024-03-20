import { HttpStatus, Injectable } from '@nestjs/common'
import { Logger, LoggerService } from '@server/libraries/logger'
import { Exception } from './exception'

export interface IException {
  status: HttpStatus
  /**
   * Unique code per controller the client can rely on.
   */
  code: number
  /**
   * This log is visible by the client.
   */
  publicMessage: string
  /**
   * This log is printed by the API and not visible by the client.
   */
  privateMessage?: string
  /**
   * Error or payload which causes the exception
   */
  cause?: any
}

@Injectable()
export class ExceptionService {
  private logger: Logger

  constructor(private loggerService: LoggerService) {
    this.logger = this.loggerService.create({ name: 'ExceptionService' })
  }

  throw(payload: IException): never {
    const message = payload.privateMessage ?? payload.publicMessage

    this.logger.log(`[ErrorCode | ${payload.code}] ${message}`, payload)

    throw new Exception({
      code: payload.code,
      message: payload.publicMessage,
      status: payload.status,
    })
  }

  isCustom(exception: Exception): boolean {
    try {
      const payload = exception.getResponse() as any

      return payload?.type === 'CORE_EXCEPTION'
    } catch (error) {
      return false
    }
  }

  getPayload(exception: Exception): { code: number; message: string } {
    const payload = exception.getResponse() as any

    return payload
  }
}
