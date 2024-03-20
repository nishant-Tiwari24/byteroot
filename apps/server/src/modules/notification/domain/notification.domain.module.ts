import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { NotificationDomainFacade } from './notification.domain.facade'
import { Notification } from './notification.model'

@Module({
  imports: [TypeOrmModule.forFeature([Notification]), DatabaseHelperModule],
  providers: [NotificationDomainFacade, NotificationDomainFacade],
  exports: [NotificationDomainFacade],
})
export class NotificationDomainModule {}
