import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Userchallenge } from './userchallenge.model'

export class UserchallengeApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Userchallenge>,
  ): Promise<Userchallenge[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/userchallenges${buildOptions}`)
  }

  static findOne(
    userchallengeId: string,
    queryOptions?: ApiHelper.QueryOptions<Userchallenge>,
  ): Promise<Userchallenge> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/userchallenges/${userchallengeId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<Userchallenge>): Promise<Userchallenge> {
    return HttpService.api.post(`/v1/userchallenges`, values)
  }

  static updateOne(
    userchallengeId: string,
    values: Partial<Userchallenge>,
  ): Promise<Userchallenge> {
    return HttpService.api.patch(
      `/v1/userchallenges/${userchallengeId}`,
      values,
    )
  }

  static deleteOne(userchallengeId: string): Promise<void> {
    return HttpService.api.delete(`/v1/userchallenges/${userchallengeId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<Userchallenge>,
  ): Promise<Userchallenge[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/userchallenges${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<Userchallenge>,
  ): Promise<Userchallenge> {
    return HttpService.api.post(
      `/v1/users/user/${userId}/userchallenges`,
      values,
    )
  }

  static findManyByChallengeId(
    challengeId: string,
    queryOptions?: ApiHelper.QueryOptions<Userchallenge>,
  ): Promise<Userchallenge[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/challenges/challenge/${challengeId}/userchallenges${buildOptions}`,
    )
  }

  static createOneByChallengeId(
    challengeId: string,
    values: Partial<Userchallenge>,
  ): Promise<Userchallenge> {
    return HttpService.api.post(
      `/v1/challenges/challenge/${challengeId}/userchallenges`,
      values,
    )
  }
}
