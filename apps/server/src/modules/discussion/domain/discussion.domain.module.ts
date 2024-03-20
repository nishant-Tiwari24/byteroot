import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { DiscussionDomainFacade } from './discussion.domain.facade'
import { Discussion } from './discussion.model'

@Module({
  imports: [TypeOrmModule.forFeature([Discussion]), DatabaseHelperModule],
  providers: [DiscussionDomainFacade, DiscussionDomainFacade],
  exports: [DiscussionDomainFacade],
})
export class DiscussionDomainModule {}
