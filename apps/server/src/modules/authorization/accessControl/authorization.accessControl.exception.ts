import { HttpStatus, Injectable } from '@nestjs/common'
import { ExceptionService } from '@server/core/exception'

@Injectable()
export class AuthorizationAccessControlException {
  constructor(private service: ExceptionService) {}

  invalidPermission(error: Error) {
    return this.service.throw({
      status: HttpStatus.FORBIDDEN,
      code: 1,
      publicMessage: 'User is not allowed',
      privateMessage: `User does not have access to this resource: ${error.message}`,
    })
  }
}
