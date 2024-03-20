import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { ChallengeDomainModule } from '../domain'
import { ChallengeController } from './challenge.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { ChallengeByUserController } from './challengeByUser.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    ChallengeDomainModule,

    UserDomainModule,
  ],
  controllers: [ChallengeController, ChallengeByUserController],
  providers: [],
})
export class ChallengeApplicationModule {}
