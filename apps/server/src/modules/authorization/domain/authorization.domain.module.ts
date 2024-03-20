import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '@server/core/database'
import { AuthorizationDomainException } from './authorization.domain.exception'
import { AuthorizationDomainFacade } from './authorization.domain.facade'
import { AuthorizationCodeFacade } from './code/authorization.code.facade'
import { AuthorizationCode } from './code/authorization.code.model'
import { AuthorizationRoleFacade } from './role/authorization.role.facade'
import { AuthorizationRole } from './role/authorization.role.model'
import { AuthorizationRoleUser } from './role/authorization.roleUser.model'

@Module({
  imports: [
    DatabaseHelperModule,
    TypeOrmModule.forFeature([
      AuthorizationCode,
      AuthorizationRole,
      AuthorizationRoleUser,
    ]),
  ],
  providers: [
    AuthorizationDomainFacade,
    AuthorizationCodeFacade,
    AuthorizationDomainException,
    AuthorizationRoleFacade,
  ],
  exports: [AuthorizationDomainFacade],
})
export class AuthorizationDomainModule {}
