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
  Userchallenge,
  UserchallengeDomainFacade,
} from '@server/modules/userchallenge/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { UserchallengeApplicationEvent } from './userchallenge.application.event'
import {
  UserchallengeCreateDto,
  UserchallengeUpdateDto,
} from './userchallenge.dto'

@Controller('/v1/userchallenges')
export class UserchallengeController {
  constructor(
    private eventService: EventService,
    private userchallengeDomainFacade: UserchallengeDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.userchallengeDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: UserchallengeCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.userchallengeDomainFacade.create(body)

    await this.eventService.emit<UserchallengeApplicationEvent.UserchallengeCreated.Payload>(
      UserchallengeApplicationEvent.UserchallengeCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:userchallengeId')
  async findOne(
    @Param('userchallengeId') userchallengeId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.userchallengeDomainFacade.findOneByIdOrFail(
      userchallengeId,
      queryOptions,
    )

    return item
  }

  @Patch('/:userchallengeId')
  async update(
    @Param('userchallengeId') userchallengeId: string,
    @Body() body: UserchallengeUpdateDto,
  ) {
    const item =
      await this.userchallengeDomainFacade.findOneByIdOrFail(userchallengeId)

    const itemUpdated = await this.userchallengeDomainFacade.update(
      item,
      body as Partial<Userchallenge>,
    )
    return itemUpdated
  }

  @Delete('/:userchallengeId')
  async delete(@Param('userchallengeId') userchallengeId: string) {
    const item =
      await this.userchallengeDomainFacade.findOneByIdOrFail(userchallengeId)

    await this.userchallengeDomainFacade.delete(item)

    return item
  }
}
