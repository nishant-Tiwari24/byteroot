import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Notification } from './notification.model'

export class NotificationApi {
  static findManyByMe(
    queryOptions: ApiHelper.QueryOptions<Notification> = {},
  ): Promise<Notification[]> {
    const options = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/users/me/notifications${options}`)
  }

  static deleteOneByMe(notificationId: string): Promise<void> {
    return HttpService.api.delete(
      `/v1/users/me/notifications/${notificationId}`,
    )
  }

  static deleteAllByMe(): Promise<void> {
    return HttpService.api.delete(`/v1/users/me/notifications`)
  }

  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Notification>,
  ): Promise<Notification[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/notifications${buildOptions}`)
  }

  static findOne(
    notificationId: string,
    queryOptions?: ApiHelper.QueryOptions<Notification>,
  ): Promise<Notification> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/notifications/${notificationId}${buildOptions}`,
    )
  }

  static createOne(notification: Partial<Notification>): Promise<Notification> {
    return HttpService.api.post(`/v1/notifications`, notification)
  }

  static updateOne(
    notificationId: string,
    values: Partial<Notification>,
  ): Promise<Notification> {
    return HttpService.api.patch(`/v1/notifications/${notificationId}`, values)
  }

  static deleteOne(notificationId: string): Promise<void> {
    return HttpService.api.delete(`/v1/notifications/${notificationId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<Notification>,
  ): Promise<Notification[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/notifications${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<Notification>,
  ): Promise<Notification> {
    return HttpService.api.post(
      `/v1/users/user/${userId}/notifications`,
      values,
    )
  }
}
