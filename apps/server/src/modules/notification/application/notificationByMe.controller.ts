import { Controller, Delete, Get, Param, Req } from '@nestjs/common'
import { Request } from 'express'
import { RequestHelper } from '@server/helpers/request'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { User } from '@server/modules/user/domain'
import { NotificationDomainFacade } from '../domain'

@Controller('/v1/users/me/notifications')
export class NotificationByMeController {
  constructor(
    private notificationDomainFacade: NotificationDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get()
  async findManyByMe(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const payload = this.authenticationDomainFacade.getRequestPayload(request)

    const user = payload.user as User

    const notifications = await this.notificationDomainFacade.findManyByUser(
      user,
      queryOptions,
    )

    return notifications
  }

  @Delete('/:notificationId')
  async deleteOne(
    @Req() request: Request,
    @Param('notificationId') notificationId: string,
  ) {
    const payload = this.authenticationDomainFacade.getRequestPayload(request)

    const user = payload.user as User

    const notification =
      await this.notificationDomainFacade.findOneByIdAndUserOrFail(
        notificationId,
        user,
      )

    await this.notificationDomainFacade.delete(notification)

    return {}
  }

  @Delete()
  async deleteAll(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const payload = this.authenticationDomainFacade.getRequestPayload(request)

    const user = payload.user as User

    const notifications = await this.notificationDomainFacade.findManyByUser(
      user,
      queryOptions,
    )

    await this.notificationDomainFacade.deleteMany(notifications)

    return {}
  }
}
