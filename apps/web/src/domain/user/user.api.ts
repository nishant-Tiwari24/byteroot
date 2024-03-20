import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { User } from './user.model'

export class UserApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<User>,
  ): Promise<User[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/users${buildOptions}`)
  }

  static findOne(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<User>,
  ): Promise<User> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/users/${userId}${buildOptions}`)
  }

  static findMe(queryOptions?: ApiHelper.QueryOptions<User>): Promise<User> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/users/me${buildOptions}`)
  }

  static createOne(user: Partial<User>): Promise<User> {
    return HttpService.api.post(`/v1/users`, user)
  }

  static updateOne(userId: string, values: Partial<User>): Promise<User> {
    return HttpService.api.patch(`/v1/users/${userId}`, values)
  }

  static deleteOne(userId: string): Promise<void> {
    return HttpService.api.delete(`/v1/users/${userId}`)
  }
}
