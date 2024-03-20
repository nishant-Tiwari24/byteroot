import { Module } from '@nestjs/common'
import { AuthorizationDomainModule } from '@server/modules/authorization/domain'
import { UserDomainModule } from '@server/modules/user/domain'
import { UserOrchestratorModule } from '@server/modules/user/orchestrators'
import { AuthenticationDomainModule } from '../../authentication/domain'
import { AuthorizationApplicationException } from './authorization.application.exception'
import { AuthorizationController } from './authorization.controller'
import { AuthorizationByUserController } from './authorizationByMe.controller'

@Module({
  imports: [
    UserDomainModule,
    AuthenticationDomainModule,
    AuthorizationDomainModule,
    UserOrchestratorModule,
  ],
  controllers: [AuthorizationController, AuthorizationByUserController],
  providers: [AuthorizationApplicationException],
})
export class AuthorizationApplicationModule {}
