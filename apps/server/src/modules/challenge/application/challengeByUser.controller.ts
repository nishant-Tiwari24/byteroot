import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { ChallengeDomainFacade } from '@server/modules/challenge/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { ChallengeApplicationEvent } from './challenge.application.event'
import { ChallengeCreateDto } from './challenge.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class ChallengeByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private challengeDomainFacade: ChallengeDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/challenges')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.challengeDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/challenges')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: ChallengeCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

    const item = await this.challengeDomainFacade.create(valuesUpdated)

    await this.eventService.emit<ChallengeApplicationEvent.ChallengeCreated.Payload>(
      ChallengeApplicationEvent.ChallengeCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
