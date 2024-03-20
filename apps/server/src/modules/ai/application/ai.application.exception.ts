import { HttpStatus, Injectable } from '@nestjs/common'
import { ExceptionService } from '@server/core/exception'

@Injectable()
export class AIApplicationException {
  constructor(private service: ExceptionService) {}

  openaiNotActivated(): never {
    return this.service.throw({
      status: HttpStatus.SERVICE_UNAVAILABLE,
      code: 0,
      publicMessage: 'Set OPENAI_API_KEY in your .env to activate OpenAI',
      privateMessage: `Set OPENAI_API_KEY in your .env to activate OpenAI`,
    })
  }

  openaiError(error: Error): never {
    return this.service.throw({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      code: 1,
      publicMessage: 'Something unexpected happened.',
      privateMessage: error?.message,
      cause: error,
    })
  }
}
