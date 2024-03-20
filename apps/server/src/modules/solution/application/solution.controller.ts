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
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { Solution, SolutionDomainFacade } from '@server/modules/solution/domain'
import { RequestHelper } from '../../../helpers/request'
import { SolutionApplicationEvent } from './solution.application.event'
import { SolutionCreateDto, SolutionUpdateDto } from './solution.dto'

@Controller('/v1/solutions')
export class SolutionController {
  userDomainFacade: any
  constructor(
    private eventService: EventService,
    private solutionDomainFacade: SolutionDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.solutionDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: SolutionCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.solutionDomainFacade.create(body)

    await this.eventService.emit<SolutionApplicationEvent.SolutionCreated.Payload>(
      SolutionApplicationEvent.SolutionCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:solutionId')
  async findOne(
    @Param('solutionId') solutionId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.solutionDomainFacade.findOneByIdOrFail(
      solutionId,
      queryOptions,
    )

    return item
  }

  @Patch('/:solutionId')
  async update(
    @Param('solutionId') solutionId: string,
    @Body() body: SolutionUpdateDto,
  ) {
    const item = await this.solutionDomainFacade.findOneByIdOrFail(solutionId)

    const itemUpdated = await this.solutionDomainFacade.update(
      item,
      body as Partial<Solution>,
    )
    return itemUpdated
  }

  @Delete('/:solutionId')
  async delete(@Param('solutionId') solutionId: string) {
    const item = await this.solutionDomainFacade.findOneByIdOrFail(solutionId)

    await this.solutionDomainFacade.delete(item)

    return item
  }
}
