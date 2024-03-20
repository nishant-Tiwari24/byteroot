import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { SolutionDomainModule } from '../domain'
import { SolutionController } from './solution.controller'

import { DiscussionDomainModule } from '../../../modules/discussion/domain'

import { SolutionByDiscussionController } from './solutionByDiscussion.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    SolutionDomainModule,

    DiscussionDomainModule,
  ],
  controllers: [SolutionController, SolutionByDiscussionController],
  providers: [],
})
export class SolutionApplicationModule {}
