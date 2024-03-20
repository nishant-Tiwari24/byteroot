import { ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ContextHelper } from '@server/helpers/context'
import { Utility } from '@server/helpers/utility'
import { AuthorizationAccessControlService } from '@server/modules/authorization/accessControl'
import { AccessControlRoleDecorator } from '../decorators/accessControl.role.decorator'
import { Constraints } from './accessControl.type'
import { AccessControlValidator } from './accessControl.validator'

@Injectable()
export class AccessControlService {
  constructor(
    private authorizationAccessControlService: AuthorizationAccessControlService,
    private validator: AccessControlValidator,
  ) {}

  async run(reflector: Reflector, context: ExecutionContext): Promise<boolean> {
    const request = ContextHelper.toRequest(context)

    const constraints = this.getConstraints(reflector, context)

    const canSkip = Utility.isEmpty(constraints.roles)

    if (canSkip) {
      return true
    }

    let userData =
      await this.authorizationAccessControlService.findUserData(request)

    await this.validator
      .check({
        userData,
        constraints,
      })
      .catch(error => {
        this.authorizationAccessControlService.onError(error)
      })

    return true
  }

  private getConstraints(
    reflector: Reflector,
    context: ExecutionContext,
  ): Constraints {
    const roles = AccessControlRoleDecorator.get(context, reflector)

    return {
      roles,
    }
  }
}
