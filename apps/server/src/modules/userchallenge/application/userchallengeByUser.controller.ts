import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { UserchallengeDomainFacade } from '@server/modules/userchallenge/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { UserchallengeApplicationEvent } from './userchallenge.application.event'
import { UserchallengeCreateDto } from './userchallenge.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class UserchallengeByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private userchallengeDomainFacade: UserchallengeDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/userchallenges')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.userchallengeDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/userchallenges')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: UserchallengeCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

    const item = await this.userchallengeDomainFacade.create(valuesUpdated)

    await this.eventService.emit<UserchallengeApplicationEvent.UserchallengeCreated.Payload>(
      UserchallengeApplicationEvent.UserchallengeCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
