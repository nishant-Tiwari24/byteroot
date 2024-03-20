import { Controller, Get, Req } from '@nestjs/common'
import { Request } from 'express'
import { Logger, LoggerService } from '@server/libraries/logger'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { UserDomainFacade } from '@server/modules/user/domain'
import { AuthorizationDomainFacade } from '../domain'

@Controller('v1/users/me/authorization')
export class AuthorizationByUserController {
  private logger: Logger

  constructor(
    private userDomainFacade: UserDomainFacade,
    private loggerService: LoggerService,
    private authorizationDomainFacade: AuthorizationDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {
    this.logger = this.loggerService.create({
      name: 'AuthorizationByUserController',
    })
  }

  @Get('/permissions')
  async getPermissions(@Req() request: Request) {
    const payload = this.authenticationDomainFacade.getRequestPayload(request)

    const user = await this.userDomainFacade.findOneByIdOrFail(payload.user.id)

    const roles = await this.authorizationDomainFacade.role.findManyByUser(user)

    return { roles }
  }
}
