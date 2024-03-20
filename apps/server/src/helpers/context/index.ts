import { ExecutionContext } from '@nestjs/common'
import { Request } from 'express'

export namespace ContextHelper {
  export function toRequest(context: ExecutionContext): Request {
    return context.switchToHttp().getRequest()
  }
}
