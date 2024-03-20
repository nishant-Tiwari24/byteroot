import { Body, Controller, Patch, Post, Req, Res } from '@nestjs/common'
import { Authentication } from '@server/core/authentication'
import { EventService } from '@server/libraries/event'
import { Logger, LoggerService } from '@server/libraries/logger'
import { User, UserDomainFacade } from '@server/modules/user/domain'
import { Request, Response } from 'express'
import { CookieService } from '../../../core/cookie'
import { AuthenticationDomainFacade } from '../domain'
import { AuthenticationApplicationEvent } from './authentication.application.event'
import { AuthenticationApplicationException } from './authentication.application.exception'
import {
  AuthenticationLoginDto,
  AuthenticationRegisterDto,
  AuthenticationResetPasswordDto,
  AuthenticationSendEmailResetPasswordDto,
} from './authentication.dto'

@Controller('/v1/authentication')
export class AuthenticationController {
  private logger: Logger

  constructor(
    private authenticationDomainFacade: AuthenticationDomainFacade,
    private exception: AuthenticationApplicationException,
    private userDomainFacade: UserDomainFacade,
    private loggerService: LoggerService,
    private event: EventService,
    private cookieService: CookieService,
  ) {
    this.logger = this.loggerService.create({
      name: 'AuthenticationController',
    })
  }

  @Post('/login')
  @Authentication.Public()
  async login(
    @Body() body: AuthenticationLoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { email, password } = body

    const user: User = await this.userDomainFacade
      .findOneByEmailWithPassword(email)
      .catch(() => this.exception.userEmailNotFound(email))

    await this.userDomainFacade
      .verifyPassword(user, password)
      .catch(() => this.exception.userPasswordNotFound(email))

    const token = this.authenticationDomainFacade.buildToken(user.id)

    const data = this.authenticationDomainFacade.setAccessToken(response, token)

    return data
  }

  @Post('/register')
  @Authentication.Public()
  async register(
    @Body() body: AuthenticationRegisterDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const {
      email,
      password,

      name,
    } = body

    const userExisting = await this.userDomainFacade
      .findOneByEmailOrFail(email)
      .catch(() => {})

    if (userExisting) {
      this.exception.userEmailNotAvailable(email)
    }

    const passwordHashed = await this.userDomainFacade.hashPassword(password)

    const user = await this.userDomainFacade.create({
      email,
      name,

      password: passwordHashed,
    })

    const token = this.authenticationDomainFacade.buildToken(user.id)

    await this.event.emit<AuthenticationApplicationEvent.UserRegistered.Payload>(
      AuthenticationApplicationEvent.UserRegistered.key,
      { userId: user.id },
    )

    const data = this.authenticationDomainFacade.setAccessToken(response, token)

    return data
  }

  @Post('/refresh')
  @Authentication.Public()
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    // console.log('Hee')
    const token = this.authenticationDomainFacade.getAccessToken(request)
    // console.log('Here')

    try {
      let userId: string

      try {
        const payload = this.authenticationDomainFacade.verifyTokenOrFail(token)

        userId = payload.userId
      } catch (error) {
        this.exception.invalidAccessToken()
      }

      const user = await this.userDomainFacade.findOneByIdOrFail(userId)

      const tokenRefreshed = this.authenticationDomainFacade.buildToken(user.id)

      const data = this.authenticationDomainFacade.setAccessToken(
        response,
        tokenRefreshed,
      )

      return data
    } catch (error) {
      this.cookieService.deleteAccessToken(response)

      throw error
    }
  }

  @Post('/reset-password-email')
  @Authentication.Public()
  async sendEmailResetPassword(
    @Body() body: AuthenticationSendEmailResetPasswordDto,
  ) {
    const user = await this.userDomainFacade
      .findOneByEmailOrFail(body.email)
      .catch(() => null)

    if (!user) {
      this.logger.log(
        `${body.email} was not found. Reset password email skipped.`,
      )

      return {}
    }

    await this.event.emit<AuthenticationApplicationEvent.UserPasswordResetRequested.Payload>(
      AuthenticationApplicationEvent.UserPasswordResetRequested.key,
      { userId: user.id },
    )

    return {}
  }

  @Patch('/reset-password')
  @Authentication.Public()
  async resetPassword(@Body() body: AuthenticationResetPasswordDto) {
    const { userId } = await this.authenticationDomainFacade
      .verifyTokenResetPasswordOrFail(body.token)
      .catch(() => this.exception.invalidResetPasswordToken())

    const user = await this.userDomainFacade.findOneByIdOrFail(userId)

    const passwordHashed = await this.userDomainFacade.hashPassword(
      body.password,
    )

    await this.userDomainFacade.update(user, {
      password: passwordHashed,
    })
    return {}
  }

  @Post('/logout')
  @Authentication.Public()
  async logout(@Res({ passthrough: true }) response: Response) {
    try {
      this.cookieService.deleteAccessToken(response)
    } catch (error) {
      console.log(error)
    }

    return {}
  }
}
