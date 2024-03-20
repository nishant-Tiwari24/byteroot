import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common'
import { Authentication } from '@server/core/authentication'
import { RequestHelper } from '@server/helpers/request'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { UserDomainFacade } from '@server/modules/user/domain'
import { Request } from 'express'
import { CookieService } from '../../../core/cookie'
import { UserCreateDto, UserUpdateDto } from './user.dto'

@Controller('v1/users')
export class UserController {
  constructor(
    private cookieSevice: CookieService,
    private userDomainFacade: UserDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get()
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const users = await this.userDomainFacade.findMany(queryOptions)

    return users
  }

  @Get('/me')
  @Authentication.AllowUserNotVerified()
  async me(@Req() request: Request) {
    const token = this.authenticationDomainFacade.getAccessToken(request)

    const { userId } = this.authenticationDomainFacade.verifyTokenOrFail(token)

    const user = await this.userDomainFacade.findOneByIdOrFail(userId)

    return user
  }

  @Post('/')
  async create(@Body() body: UserCreateDto) {
    const userCreated = await this.userDomainFacade.create(body)

    return userCreated
  }

  @Get('/:userId')
  async findOne(@Param('userId') userId: string, @Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const user = await this.userDomainFacade.findOneByIdOrFail(
      userId,
      queryOptions,
    )

    return user
  }

  @Patch('/:userId')
  async update(@Param('userId') userId: string, @Body() body: UserUpdateDto) {
    const user = await this.userDomainFacade.findOneByIdOrFail(userId)

    const userUpdated = await this.userDomainFacade.update(user, body)

    return userUpdated
  }

  @Delete('/:userId')
  async delete(@Param('userId') userId: string) {
    const user = await this.userDomainFacade.findOneByIdOrFail(userId)

    await this.userDomainFacade.delete(user)

    return user
  }
}
