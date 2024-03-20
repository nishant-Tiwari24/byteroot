import { Injectable } from '@nestjs/common'
import { AuthorizationCodeFacade } from './code/authorization.code.facade'
import { AuthorizationRoleFacade } from './role/authorization.role.facade'

@Injectable()
export class AuthorizationDomainFacade {
  constructor(
    public code: AuthorizationCodeFacade,
    public role: AuthorizationRoleFacade,
  ) {}
}
