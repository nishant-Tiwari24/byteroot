import { HttpStatus, Injectable } from '@nestjs/common'
import { ExceptionService } from '@server/core/exception'

@Injectable()
export class AuthorizationApplicationException {
  constructor(private service: ExceptionService) {}

  typeNotFound(type: string): never {
    return this.service.throw({
      status: HttpStatus.FORBIDDEN,
      code: 0,
      publicMessage: 'Authorization type was not found',
      privateMessage: `Authorization type "${type}" is not handled`,
    })
  }

  invalidCodeVerification(error: Error): never {
    return this.service.throw({
      status: HttpStatus.FORBIDDEN,
      code: 1,
      publicMessage: 'Code is incorrect',
      cause: error,
    })
  }

  expiredCodeVerification(error: Error): never {
    return this.service.throw({
      status: HttpStatus.FORBIDDEN,
      code: 2,
      publicMessage: 'Code is expired',
      cause: error,
    })
  }
}
