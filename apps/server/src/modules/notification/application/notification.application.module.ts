import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { NotificationDomainModule } from '../domain'
import { NotificationByMeController } from './notificationByMe.controller'

@Module({
  imports: [NotificationDomainModule, AuthenticationDomainModule],
  controllers: [NotificationByMeController],
  providers: [],
})
export class NotificationApplicationModule {}
