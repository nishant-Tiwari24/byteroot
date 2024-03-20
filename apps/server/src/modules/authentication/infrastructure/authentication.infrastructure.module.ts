import { Global, Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { EmailModule } from '@server/libraries/email/email.module'
import { UserDomainModule } from '@server/modules/user/domain'
import { AuthenticationDomainModule } from '../domain'
import { AuthenticationInfrastructureException } from './authentication.infrastructure.exception'
import { AuthenticationGuard } from './guards/authentication.guard'
import { AuthenticationGuardService } from './guards/authentication.guard.service'
import { AuthenticationCommunicationSubscriber } from './subscribers/authentication.communication.subscriber'

@Global()
@Module({
  imports: [UserDomainModule, AuthenticationDomainModule, EmailModule],
  providers: [
    AuthenticationCommunicationSubscriber,
    AuthenticationGuardService,
    AuthenticationInfrastructureException,
  ],
  exports: [AuthenticationGuardService],
})
export class AuthenticationInfrastructureModule {
  static getGuards() {
    return [{ provide: APP_GUARD, useClass: AuthenticationGuard }]
  }
}
