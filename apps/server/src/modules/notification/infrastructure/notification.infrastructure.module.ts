import { Module } from '@nestjs/common'
import { SocketModule } from '@server/libraries/socket'
import { AuthorizationDomainModule } from '@server/modules/authorization/domain'
import { NotificationDomainModule } from '../domain'

import { NotificationChallengeSubscriber } from './subscribers/notification.challenge.subscriber'

import { NotificationAttemptSubscriber } from './subscribers/notification.attempt.subscriber'

import { NotificationDiscussionSubscriber } from './subscribers/notification.discussion.subscriber'

import { NotificationSolutionSubscriber } from './subscribers/notification.solution.subscriber'

import { NotificationUserchallengeSubscriber } from './subscribers/notification.userchallenge.subscriber'

@Module({
  imports: [AuthorizationDomainModule, NotificationDomainModule, SocketModule],
  providers: [
    NotificationChallengeSubscriber,

    NotificationAttemptSubscriber,

    NotificationDiscussionSubscriber,

    NotificationSolutionSubscriber,

    NotificationUserchallengeSubscriber,
  ],
  exports: [],
})
export class NotificationInfrastructureModule {}
