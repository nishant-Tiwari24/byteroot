import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { AttemptDomainFacade } from '@server/modules/attempt/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { AttemptApplicationEvent } from './attempt.application.event'
import { AttemptCreateDto } from './attempt.dto'

import { ChallengeDomainFacade } from '../../challenge/domain'

@Controller('/v1/challenges')
export class AttemptByChallengeController {
  constructor(
    private challengeDomainFacade: ChallengeDomainFacade,

    private attemptDomainFacade: AttemptDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/challenge/:challengeId/attempts')
  async findManyChallengeId(
    @Param('challengeId') challengeId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent =
      await this.challengeDomainFacade.findOneByIdOrFail(challengeId)

    const items = await this.attemptDomainFacade.findManyByChallenge(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/challenge/:challengeId/attempts')
  async createByChallengeId(
    @Param('challengeId') challengeId: string,
    @Body() body: AttemptCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, challengeId }

    const item = await this.attemptDomainFacade.create(valuesUpdated)

    await this.eventService.emit<AttemptApplicationEvent.AttemptCreated.Payload>(
      AttemptApplicationEvent.AttemptCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
