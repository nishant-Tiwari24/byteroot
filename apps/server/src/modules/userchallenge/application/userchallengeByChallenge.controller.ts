import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { UserchallengeDomainFacade } from '@server/modules/userchallenge/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { UserchallengeApplicationEvent } from './userchallenge.application.event'
import { UserchallengeCreateDto } from './userchallenge.dto'

import { ChallengeDomainFacade } from '../../challenge/domain'

@Controller('/v1/challenges')
export class UserchallengeByChallengeController {
  constructor(
    private challengeDomainFacade: ChallengeDomainFacade,

    private userchallengeDomainFacade: UserchallengeDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/challenge/:challengeId/userchallenges')
  async findManyChallengeId(
    @Param('challengeId') challengeId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent =
      await this.challengeDomainFacade.findOneByIdOrFail(challengeId)

    const items = await this.userchallengeDomainFacade.findManyByChallenge(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/challenge/:challengeId/userchallenges')
  async createByChallengeId(
    @Param('challengeId') challengeId: string,
    @Body() body: UserchallengeCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, challengeId }

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
