import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from './authentication/domain'
import { AuthorizationDomainModule } from './authorization/domain'

import { UserDomainModule } from './user/domain'

import { NotificationDomainModule } from './notification/domain'

import { ChallengeDomainModule } from './challenge/domain'

import { AttemptDomainModule } from './attempt/domain'

import { DiscussionDomainModule } from './discussion/domain'

import { SolutionDomainModule } from './solution/domain'

import { UserchallengeDomainModule } from './userchallenge/domain'

@Module({
  imports: [
    AuthenticationDomainModule,
    AuthorizationDomainModule,
    UserDomainModule,
    NotificationDomainModule,

    ChallengeDomainModule,

    AttemptDomainModule,

    DiscussionDomainModule,

    SolutionDomainModule,

    UserchallengeDomainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppDomainModule {}
