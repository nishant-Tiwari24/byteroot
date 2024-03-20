import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { UserchallengeDomainFacade } from './userchallenge.domain.facade'
import { Userchallenge } from './userchallenge.model'

@Module({
  imports: [TypeOrmModule.forFeature([Userchallenge]), DatabaseHelperModule],
  providers: [UserchallengeDomainFacade, UserchallengeDomainFacade],
  exports: [UserchallengeDomainFacade],
})
export class UserchallengeDomainModule {}
