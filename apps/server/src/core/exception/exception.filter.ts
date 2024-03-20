import {
  ArgumentsHost,
  Catch,
  HttpException,
  ExceptionFilter as NestExceptionFilter,
} from '@nestjs/common'
import { Response } from 'express'
import { ExceptionService } from './exception.service'

@Catch(HttpException)
export class ExceptionFilter implements NestExceptionFilter {
  constructor(private exceptionService: ExceptionService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp()
    const response = context.getResponse<Response>()
    const request = context.getRequest<Request>()
    const status = exception.getStatus()

    if (this.exceptionService.isCustom(exception)) {
      const payload = this.exceptionService.getPayload(exception)

      response.status(status).json({
        code: payload.code,
        message: payload.message,
      })
    } else {
      const payload = exception.getResponse() as any
      const message = exception.message
      const data = payload?.message

      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message,
        data,
      })
    }
  }
}
