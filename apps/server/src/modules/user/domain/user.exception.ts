import { HttpStatus, Injectable } from '@nestjs/common'
import { ExceptionService } from '@server/core/exception'

@Injectable()
export class UserException {
  constructor(private service: ExceptionService) {}

  notFoundById(id: string) {
    return this.service.throw({
      status: HttpStatus.NOT_FOUND,
      code: 1,
      publicMessage: 'User was not found',
      privateMessage: `User with id "${id}" was not found.`,
    })
  }

  notFoundByEmail(email: string) {
    return this.service.throw({
      status: HttpStatus.NOT_FOUND,
      code: 2,
      publicMessage: 'User was not found',
      privateMessage: `User with email "${email}" was not found.`,
    })
  }
}
