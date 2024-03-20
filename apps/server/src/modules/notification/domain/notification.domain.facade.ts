import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '@server/modules/user/domain'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Notification } from './notification.model'

@Injectable()
export class NotificationDomainFacade {
  constructor(
    @InjectRepository(Notification)
    private repository: Repository<Notification>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Notification>): Promise<Notification> {
    return this.repository.save(values)
  }

  async update(
    notification: Notification,
    values: Partial<Notification>,
  ): Promise<Notification> {
    const itemUpdated = { ...notification, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(notification: Notification): Promise<void> {
    await this.repository.softDelete(notification.id)
  }
  async deleteMany(notifications: Notification[]): Promise<void> {
    const isEmpty = notifications.length === 0

    if (isEmpty) {
      return
    }

    const ids = notifications.map(notification => notification.id)

    await this.repository.softDelete(ids)
  }

  async findManyByUser(
    user: User,
    queryOptions: RequestHelper.QueryOptions<Notification> = {},
  ): Promise<Notification[]> {
    if (!user) {
      this.databaseHelper.invalidQueryWhere('user')
    }

    const queryOptionsEnsured: RequestHelper.QueryOptions<Notification> = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        userId: user.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }

  async findOneByIdAndUserOrFail(
    notificationId: string,
    user: User,
  ): Promise<Notification> {
    if (!user) {
      this.databaseHelper.invalidQueryWhere('user')
    }

    const queryOptions: RequestHelper.QueryOptions<Notification> = {
      filters: {
        userId: user.id,
        id: notificationId,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    const notification = await query.getOne()

    if (!notification) {
      this.databaseHelper.notFoundByQuery(queryOptions.filters)
    }

    return notification
  }
}
