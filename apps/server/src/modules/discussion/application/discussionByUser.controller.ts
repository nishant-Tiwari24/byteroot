import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { DiscussionDomainFacade } from '@server/modules/discussion/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { DiscussionApplicationEvent } from './discussion.application.event'
import { DiscussionCreateDto } from './discussion.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class DiscussionByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private discussionDomainFacade: DiscussionDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/discussions')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.discussionDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/discussions')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: DiscussionCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

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
