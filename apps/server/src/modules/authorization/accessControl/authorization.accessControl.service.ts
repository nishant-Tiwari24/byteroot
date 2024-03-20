import { Injectable } from '@nestjs/common'
import {
  AccessControl,
  AccessControlProvider,
} from '@server/core/accessControl'
import { Request } from 'express'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { User } from '@server/modules/user/domain'
import { AuthorizationDomainFacade, AuthorizationRole } from '../domain'
import { AuthorizationAccessControlException } from './authorization.accessControl.exception'

@Injectable()
export class AuthorizationAccessControlService
  implements AccessControlProvider
{
  constructor(
    private authenticationDomainFacade: AuthenticationDomainFacade,
    private authorizationDomainFacade: AuthorizationDomainFacade,
    private exception: AuthorizationAccessControlException,
  ) {}

  async findUserData(request: Request): Promise<AccessControl.UserData> {
    const user = await this.getUser(request)
    const authorizationRoles = await this.findManyAuthorizationRoles(user)

    return {
      user,
      roles: authorizationRoles.map(role => role.name),
    }
  }

  onError(error: Error): never {
    return this.exception.invalidPermission(error)
  }

  private async getUser(request: Request): Promise<User> {
    const payload = this.authenticationDomainFacade.getRequestPayload(request)
    const user = payload.user as User

    return user
  }

  private async findManyAuthorizationRoles(
    user: User,
  ): Promise<AuthorizationRole[]> {
    const roles = await this.authorizationDomainFacade.role
      .findManyByUser(user)
      .catch(() => [])

    return roles
  }
}
