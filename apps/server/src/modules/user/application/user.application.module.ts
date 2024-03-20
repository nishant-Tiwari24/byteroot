import { Module } from '@nestjs/common'
import { AuthorizationDomainModule } from '@server/modules/authorization/domain'
import { AuthenticationDomainModule } from '../../../modules/authentication/domain'
import { UserDomainModule } from '../domain'
import { UserController } from './user.controller'

@Module({
  imports: [
    UserDomainModule,
    AuthenticationDomainModule,
    AuthorizationDomainModule,
  ],
  controllers: [UserController],
  providers: [],
})
export class UserApplicationModule {}
