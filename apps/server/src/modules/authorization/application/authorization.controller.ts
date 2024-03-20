import { Body, Controller, Param, Post } from '@nestjs/common'
import { Authentication } from '@server/core/authentication'
import { Logger, LoggerService } from '@server/libraries/logger'
import {
  AuthorizationCodeType,
  AuthorizationDomainFacade,
} from '@server/modules/authorization/domain'
import { User, UserDomainFacade } from '@server/modules/user/domain'
import { UserOrchestrator } from '@server/modules/user/orchestrators'
import { AuthorizationApplicationException } from './authorization.application.exception'
import {
  AuthorizationCreateCodeDto,
  AuthorizationVerifyCodeDto,
} from './authorization.dto'

@Controller('v1/authorization')
export class AuthorizationController {
  private logger: Logger

  constructor(
    private userDomainFacade: UserDomainFacade,
    private exception: AuthorizationApplicationException,
    private loggerService: LoggerService,
    private authorizationDomainFacade: AuthorizationDomainFacade,
    private userAuthorizationOrchestrator: UserOrchestrator,
  ) {
    this.logger = this.loggerService.create({
      name: 'AuthorizationController',
    })
  }

  @Post('/:type/code')
  @Authentication.Public()
  async createCode(
    @Param('type') type: AuthorizationCodeType,
    @Body() body: AuthorizationCreateCodeDto,
  ) {
    const user = await this.userDomainFacade.findOneByEmailOrFail(body.email)

    const values = this.getCodeValues(type)

    await this.deprecatePreviousCodes(user, type)

    const code = await this.authorizationDomainFacade.code.createOrFail(
      { ...values, type },
      user,
    )

    return code
  }

  @Post('/:type/code-verification')
  @Authentication.Public()
  async verifyCode(
    @Body() body: AuthorizationVerifyCodeDto,
    @Param('type') type: AuthorizationCodeType,
  ) {
    const user = await this.userDomainFacade.findOneByEmailOrFail(body.email)

    const code = await this.authorizationDomainFacade.code
      .findOneActiveOrFail(user, body.keyPrivate, body.keyPublic)
      .catch(error => {
        this.exception.invalidCodeVerification(error)
      })

    await this.authorizationDomainFacade.code.check(code).catch(error => {
      this.exception.expiredCodeVerification(error)
    })

    await this.authorizationDomainFacade.code.setStatusUsed(code)

    await this.onSuccess(type, user)

    return {}
  }

  private getCodeValues(type: AuthorizationCodeType): {
    durationMinutes: number
  } {
    switch (type) {
      case AuthorizationCodeType.USER_VERIFICATION:
        return this.userAuthorizationOrchestrator.getCodeValues()
      default:
        this.exception.typeNotFound(type)
    }
  }

  private async onSuccess(
    type: AuthorizationCodeType,
    user: User,
  ): Promise<void> {
    switch (type) {
      case AuthorizationCodeType.USER_VERIFICATION:
        await this.userAuthorizationOrchestrator.onSuccess(user)
        break
      default:
        this.exception.typeNotFound(type)
    }
  }

  private async deprecatePreviousCodes(
    user: User,
    type: AuthorizationCodeType,
  ): Promise<void> {
    const codes =
      await this.authorizationDomainFacade.code.findManyByUserAndType(
        user,
        type,
      )

    for (const code of codes) {
      await this.authorizationDomainFacade.code.setStatusExpired(code)
    }
  }
}
