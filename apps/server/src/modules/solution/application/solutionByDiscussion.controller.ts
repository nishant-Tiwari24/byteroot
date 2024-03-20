import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { SolutionDomainFacade } from '@server/modules/solution/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { SolutionApplicationEvent } from './solution.application.event'
import { SolutionCreateDto } from './solution.dto'

import { DiscussionDomainFacade } from '../../discussion/domain'

@Controller('/v1/discussions')
export class SolutionByDiscussionController {
  constructor(
    private discussionDomainFacade: DiscussionDomainFacade,

    private solutionDomainFacade: SolutionDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/discussion/:discussionId/solutions')
  async findManyDiscussionId(
    @Param('discussionId') discussionId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent =
      await this.discussionDomainFacade.findOneByIdOrFail(discussionId)

    const items = await this.solutionDomainFacade.findManyByDiscussion(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/discussion/:discussionId/solutions')
  async createByDiscussionId(
    @Param('discussionId') discussionId: string,
    @Body() body: SolutionCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, discussionId }

    const item = await this.solutionDomainFacade.create(valuesUpdated)

    await this.eventService.emit<SolutionApplicationEvent.SolutionCreated.Payload>(
      SolutionApplicationEvent.SolutionCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
