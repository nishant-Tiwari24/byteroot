import { Module } from '@nestjs/common'
import { AuthenticationInfrastructureModule } from './authentication/infrastructure'
import { AuthorizationInfrastructureModule } from './authorization/infrastructure'
import { NotificationInfrastructureModule } from './notification/infrastructure'

@Module({
  imports: [
    AuthenticationInfrastructureModule,
    AuthorizationInfrastructureModule,
    NotificationInfrastructureModule,
  ],
  controllers: [],
  providers: [],
})
export class AppInfrastructureModule {}
