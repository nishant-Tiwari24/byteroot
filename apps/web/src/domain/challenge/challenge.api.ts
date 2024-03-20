import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Challenge } from './challenge.model'

export class ChallengeApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Challenge>,
  ): Promise<Challenge[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/challenges${buildOptions}`)
  }

  static findOne(
    challengeId: string,
    queryOptions?: ApiHelper.QueryOptions<Challenge>,
  ): Promise<Challenge> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/challenges/${challengeId}${buildOptions}`)
  }

  static createOne(values: Partial<Challenge>): Promise<Challenge> {
    return HttpService.api.post(`/v1/challenges`, values)
  }

  static updateOne(
    challengeId: string,
    values: Partial<Challenge>,
  ): Promise<Challenge> {
    return HttpService.api.patch(`/v1/challenges/${challengeId}`, values)
  }

  static deleteOne(challengeId: string): Promise<void> {
    return HttpService.api.delete(`/v1/challenges/${challengeId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<Challenge>,
  ): Promise<Challenge[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/challenges${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<Challenge>,
  ): Promise<Challenge> {
    return HttpService.api.post(`/v1/users/user/${userId}/challenges`, values)
  }
}
