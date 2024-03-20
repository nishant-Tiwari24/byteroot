import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { DiscussionDomainModule } from '../domain'
import { DiscussionController } from './discussion.controller'

import { ChallengeDomainModule } from '../../../modules/challenge/domain'

import { DiscussionByChallengeController } from './discussionByChallenge.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { DiscussionByUserController } from './discussionByUser.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    DiscussionDomainModule,

    ChallengeDomainModule,

    UserDomainModule,
  ],
  controllers: [
    DiscussionController,

    DiscussionByChallengeController,

    DiscussionByUserController,
  ],
  providers: [],
})
export class DiscussionApplicationModule {}
