import { HttpStatus, Injectable } from '@nestjs/common'
import { ExceptionService } from '@server/core/exception'
import { User } from '@server/modules/user/domain'

@Injectable()
export class AuthorizationDomainException {
  constructor(private service: ExceptionService) {}

  codeNotFoundById(id: string) {
    return this.service.throw({
      status: HttpStatus.NOT_FOUND,
      code: 1,
      publicMessage: 'Authorization code was not found',
      privateMessage: `Authorization code id "${id}" was not found.`,
    })
  }

  codeNotFoundByKeys(user: User, keyPrivate: string, keyPublic: string) {
    return this.service.throw({
      status: HttpStatus.NOT_FOUND,
      code: 1,
      publicMessage: 'Authorization code was not found',
      privateMessage: `Authorization code with private key "${keyPrivate}" and public key "${keyPublic}" was not found for user "${user.id}".`,
    })
  }
}
