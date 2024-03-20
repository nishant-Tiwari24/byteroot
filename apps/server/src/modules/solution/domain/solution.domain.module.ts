import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { SolutionDomainFacade } from './solution.domain.facade'
import { Solution } from './solution.model'

@Module({
  imports: [TypeOrmModule.forFeature([Solution]), DatabaseHelperModule],
  providers: [SolutionDomainFacade, SolutionDomainFacade],
  exports: [SolutionDomainFacade],
})
export class SolutionDomainModule {}
