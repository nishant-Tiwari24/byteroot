import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { UserDomainFacade } from './user.domain.facade'
import { UserException } from './user.exception'
import { User } from './user.model'

@Module({
  imports: [DatabaseHelperModule, TypeOrmModule.forFeature([User])],
  providers: [UserDomainFacade, UserException],
  exports: [UserDomainFacade],
})
export class UserDomainModule {}
