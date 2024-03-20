import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { AttemptDomainFacade } from '@server/modules/attempt/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { AttemptApplicationEvent } from './attempt.application.event'
import { AttemptCreateDto } from './attempt.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class AttemptByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private attemptDomainFacade: AttemptDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/attempts')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.attemptDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  // ------------------
  // @Post('user/:userId/attemtps')
  // async createOneByUserId(
  //   @Param('userId') userId: string,
  //   @Body() body: AttemptCreateDto,
  //   @Req() request: Request,
  // ) {
  //   const { user } = this.authenticationDomainFacade.getRequestPayload(request)
  //   const valuesUpdated = { ...body, userId }
  //   const item = await this.attemptDomainFacade.create(valuesUpdated)
  //   await this.eventService.emit<AttemptApplicationEvent.AttemptCreated.Payload>(
  //     AttemptApplicationEvent.AttemptCreated.key,
  //     {
  //       id: item.id,
  //       userId: user.id,
  //     },
  //   )
  // }

  @Post('/user/:userId/attempts')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: AttemptCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

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
