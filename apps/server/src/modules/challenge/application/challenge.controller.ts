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
  Challenge,
  ChallengeDomainFacade,
} from '@server/modules/challenge/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { ChallengeApplicationEvent } from './challenge.application.event'
import { ChallengeCreateDto, ChallengeUpdateDto } from './challenge.dto'

@Controller('/v1/challenges')
export class ChallengeController {
  constructor(
    private eventService: EventService,
    private challengeDomainFacade: ChallengeDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.challengeDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: ChallengeCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.challengeDomainFacade.create(body)

    await this.eventService.emit<ChallengeApplicationEvent.ChallengeCreated.Payload>(
      ChallengeApplicationEvent.ChallengeCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:challengeId')
  async findOne(
    @Param('challengeId') challengeId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.challengeDomainFacade.findOneByIdOrFail(
      challengeId,
      queryOptions,
    )

    return item
  }

  @Patch('/:challengeId')
  async update(
    @Param('challengeId') challengeId: string,
    @Body() body: ChallengeUpdateDto,
  ) {
    const item = await this.challengeDomainFacade.findOneByIdOrFail(challengeId)

    const itemUpdated = await this.challengeDomainFacade.update(
      item,
      body as Partial<Challenge>,
    )
    return itemUpdated
  }

  @Delete('/:challengeId')
  async delete(@Param('challengeId') challengeId: string) {
    const item = await this.challengeDomainFacade.findOneByIdOrFail(challengeId)

    await this.challengeDomainFacade.delete(item)

    return item
  }
}
