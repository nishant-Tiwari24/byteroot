import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Attempt } from './attempt.model'

export class AttemptApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Attempt>,
  ): Promise<Attempt[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/attempts${buildOptions}`)
  }

  static findOne(
    attemptId: string,
    queryOptions?: ApiHelper.QueryOptions<Attempt>,
  ): Promise<Attempt> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/attempts/${attemptId}${buildOptions}`)
  }

  static createOne(values: Partial<Attempt>): Promise<Attempt> {
    return HttpService.api.post(`/v1/attempts`, values)
  }

  static updateOne(
    attemptId: string,
    values: Partial<Attempt>,
  ): Promise<Attempt> {
    return HttpService.api.patch(`/v1/attempts/${attemptId}`, values)
  }

  static deleteOne(attemptId: string): Promise<void> {
    return HttpService.api.delete(`/v1/attempts/${attemptId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<Attempt>,
  ): Promise<Attempt[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/attempts${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<Attempt>,
  ): Promise<Attempt> {
    return HttpService.api.post(`/v1/users/user/${userId}/attempts`, values)
  }

  static findManyByChallengeId(
    challengeId: string,
    queryOptions?: ApiHelper.QueryOptions<Attempt>,
  ): Promise<Attempt[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/challenges/challenge/${challengeId}/attempts${buildOptions}`,
    )
  }

  static createOneByChallengeId(
    challengeId: string,
    values: Partial<Attempt>,
  ): Promise<Attempt> {
    return HttpService.api.post(
      `/v1/challenges/challenge/${challengeId}/attempts`,
      values,
    )
  }
}
