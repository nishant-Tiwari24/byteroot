import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CookieModule } from '@server/core/cookie'
import { DatabaseHelperModule } from '@server/core/database'
import { AuthorizationCode } from '../../authorization/domain/code/authorization.code.model'
import { AuthenticationDomainFacade } from './authentication.domain.facade'

@Module({
  imports: [
    DatabaseHelperModule,
    TypeOrmModule.forFeature([AuthorizationCode]),
    CookieModule,
  ],
  providers: [AuthenticationDomainFacade],
  exports: [AuthenticationDomainFacade],
})
export class AuthenticationDomainModule {}
