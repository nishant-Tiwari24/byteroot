import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { DiscussionDomainFacade } from '@server/modules/discussion/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { DiscussionApplicationEvent } from './discussion.application.event'
import { DiscussionCreateDto } from './discussion.dto'

import { ChallengeDomainFacade } from '../../challenge/domain'

@Controller('/v1/challenges')
export class DiscussionByChallengeController {
  constructor(
    private challengeDomainFacade: ChallengeDomainFacade,

    private discussionDomainFacade: DiscussionDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/challenge/:challengeId/discussions')
  async findManyChallengeId(
    @Param('challengeId') challengeId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent =
      await this.challengeDomainFacade.findOneByIdOrFail(challengeId)

    const items = await this.discussionDomainFacade.findManyByChallenge(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/challenge/:challengeId/discussions')
  async createByChallengeId(
    @Param('challengeId') challengeId: string,
    @Body() body: DiscussionCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, challengeId }

    const item = await this.discussionDomainFacade.create(valuesUpdated)

    await this.eventService.emit<DiscussionApplicationEvent.DiscussionCreated.Payload>(
      DiscussionApplicationEvent.DiscussionCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
