import { Global, Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { AuthorizationAccessControlModule } from '@server/modules/authorization/accessControl'
import { AccessControlGuard } from './guards/accessControl.guard'
import { AccessControlService } from './internal/accessControl.service'
import { AccessControlValidator } from './internal/accessControl.validator'

@Global()
@Module({
  imports: [AuthorizationAccessControlModule],
  providers: [AccessControlService, AccessControlValidator],
  exports: [AccessControlService],
})
export class AccessControlModule {
  static getGuards() {
    return [{ provide: APP_GUARD, useClass: AccessControlGuard }]
  }
}
