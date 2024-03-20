import { Module } from '@nestjs/common'
import { EmailModule } from '@server/libraries/email/email.module'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { UserDomainModule } from '@server/modules/user/domain'
import { AuthorizationDomainModule } from '../domain'
import { AuthorizationCommunicationSubscriber } from './subscribers/authorization.communication.subscriber'

@Module({
  imports: [
    UserDomainModule,
    AuthorizationDomainModule,
    AuthenticationDomainModule,
    EmailModule,
  ],
  providers: [AuthorizationCommunicationSubscriber],
  exports: [],
})
export class AuthorizationInfrastructureModule {}
