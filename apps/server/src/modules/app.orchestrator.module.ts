import { Module } from '@nestjs/common'
import { UserOrchestratorModule } from './user/orchestrators'

@Module({
  imports: [UserOrchestratorModule],
  controllers: [],
  providers: [],
})
export class AppOrchestratorModule {}
