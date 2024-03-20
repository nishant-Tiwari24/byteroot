import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { UserchallengeDomainModule } from '../domain'
import { UserchallengeController } from './userchallenge.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { UserchallengeByUserController } from './userchallengeByUser.controller'

import { ChallengeDomainModule } from '../../../modules/challenge/domain'

import { UserchallengeByChallengeController } from './userchallengeByChallenge.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    UserchallengeDomainModule,

    UserDomainModule,

    ChallengeDomainModule,
  ],
  controllers: [
    UserchallengeController,

    UserchallengeByUserController,

    UserchallengeByChallengeController,
  ],
  providers: [],
})
export class UserchallengeApplicationModule {}
