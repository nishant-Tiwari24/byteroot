import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { AttemptDomainFacade } from './attempt.domain.facade'
import { Attempt } from './attempt.model'

@Module({
  imports: [TypeOrmModule.forFeature([Attempt]), DatabaseHelperModule],
  providers: [AttemptDomainFacade, AttemptDomainFacade],
  exports: [AttemptDomainFacade],
})
export class AttemptDomainModule {}
