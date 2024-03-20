import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Solution } from './solution.model'

export class SolutionApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Solution>,
  ): Promise<Solution[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/solutions${buildOptions}`)
  }

  static findOne(
    solutionId: string,
    queryOptions?: ApiHelper.QueryOptions<Solution>,
  ): Promise<Solution> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/solutions/${solutionId}${buildOptions}`)
  }

  static createOne(values: Partial<Solution>): Promise<Solution> {
    return HttpService.api.post(`/v1/solutions`, values)
  }

  static updateOne(
    solutionId: string,
    values: Partial<Solution>,
  ): Promise<Solution> {
    return HttpService.api.patch(`/v1/solutions/${solutionId}`, values)
  }

  static deleteOne(solutionId: string): Promise<void> {
    return HttpService.api.delete(`/v1/solutions/${solutionId}`)
  }

  static findManyByDiscussionId(
    discussionId: string,
    queryOptions?: ApiHelper.QueryOptions<Solution>,
  ): Promise<Solution[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/discussions/discussion/${discussionId}/solutions${buildOptions}`,
    )
  }

  static createOneByDiscussionId(
    discussionId: string,
    values: Partial<Solution>,
  ): Promise<Solution> {
    return HttpService.api.post(
      `/v1/discussions/discussion/${discussionId}/solutions`,
      values,
    )
  }
}
