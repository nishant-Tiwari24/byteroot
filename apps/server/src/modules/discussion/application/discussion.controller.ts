import { Request } from 'express'

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
import { EventService } from '@server/libraries/event'
import {
  Discussion,
  DiscussionDomainFacade,
} from '@server/modules/discussion/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { DiscussionApplicationEvent } from './discussion.application.event'
import { DiscussionCreateDto, DiscussionUpdateDto } from './discussion.dto'

@Controller('/v1/discussions')
export class DiscussionController {
  constructor(
    private eventService: EventService,
    private discussionDomainFacade: DiscussionDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.discussionDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: DiscussionCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.discussionDomainFacade.create(body)

    await this.eventService.emit<DiscussionApplicationEvent.DiscussionCreated.Payload>(
      DiscussionApplicationEvent.DiscussionCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:discussionId')
  async findOne(
    @Param('discussionId') discussionId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.discussionDomainFacade.findOneByIdOrFail(
      discussionId,
      queryOptions,
    )

    return item
  }

  @Patch('/:discussionId')
  async update(
    @Param('discussionId') discussionId: string,
    @Body() body: DiscussionUpdateDto,
  ) {
    const item =
      await this.discussionDomainFacade.findOneByIdOrFail(discussionId)

    const itemUpdated = await this.discussionDomainFacade.update(
      item,
      body as Partial<Discussion>,
    )
    return itemUpdated
  }

  @Delete('/:discussionId')
  async delete(@Param('discussionId') discussionId: string) {
    const item =
      await this.discussionDomainFacade.findOneByIdOrFail(discussionId)

    await this.discussionDomainFacade.delete(item)

    return item
  }
}
