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
import { Attempt, AttemptDomainFacade } from '@server/modules/attempt/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { AttemptApplicationEvent } from './attempt.application.event'
import { AttemptCreateDto, AttemptUpdateDto } from './attempt.dto'

@Controller('/v1/attempts')
export class AttemptController {
  constructor(
    private eventService: EventService,
    private attemptDomainFacade: AttemptDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.attemptDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: AttemptCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.attemptDomainFacade.create(body)

    await this.eventService.emit<AttemptApplicationEvent.AttemptCreated.Payload>(
      AttemptApplicationEvent.AttemptCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:attemptId')
  async findOne(
    @Param('attemptId') attemptId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.attemptDomainFacade.findOneByIdOrFail(
      attemptId,
      queryOptions,
    )

    return item
  }

  @Patch('/:attemptId')
  async update(
    @Param('attemptId') attemptId: string,
    @Body() body: AttemptUpdateDto,
  ) {
    const item = await this.attemptDomainFacade.findOneByIdOrFail(attemptId)

    const itemUpdated = await this.attemptDomainFacade.update(
      item,
      body as Partial<Attempt>,
    )
    return itemUpdated
  }

  @Delete('/:attemptId')
  async delete(@Param('attemptId') attemptId: string) {
    const item = await this.attemptDomainFacade.findOneByIdOrFail(attemptId)

    await this.attemptDomainFacade.delete(item)

    return item
  }
}
