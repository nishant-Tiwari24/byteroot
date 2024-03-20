import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { AttemptDomainModule } from '../domain'
import { AttemptController } from './attempt.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { AttemptByUserController } from './attemptByUser.controller'

import { ChallengeDomainModule } from '../../../modules/challenge/domain'

import { AttemptByChallengeController } from './attemptByChallenge.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    AttemptDomainModule,

    UserDomainModule,

    ChallengeDomainModule,
  ],
  controllers: [
    AttemptController,

    AttemptByUserController,

    AttemptByChallengeController,
  ],
  providers: [],
})
export class AttemptApplicationModule {}
