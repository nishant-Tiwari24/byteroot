import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { ChallengeDomainFacade } from './challenge.domain.facade'
import { Challenge } from './challenge.model'

@Module({
  imports: [TypeOrmModule.forFeature([Challenge]), DatabaseHelperModule],
  providers: [ChallengeDomainFacade, ChallengeDomainFacade],
  exports: [ChallengeDomainFacade],
})
export class ChallengeDomainModule {}
