import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Solution } from './solution.model'

import { Discussion } from '../../discussion/domain'

@Injectable()
export class SolutionDomainFacade {
  constructor(
    @InjectRepository(Solution)
    private repository: Repository<Solution>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Solution>): Promise<Solution> {
    return this.repository.save(values)
  }

  async update(item: Solution, values: Partial<Solution>): Promise<Solution> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Solution): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Solution> = {},
  ): Promise<Solution[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Solution> = {},
  ): Promise<Solution> {
    if (!id) {
      this.databaseHelper.invalidQueryWhere('id')
    }

    const queryOptionsEnsured = {
      includes: queryOptions?.includes,
      filters: {
        id: id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    const item = await query.getOne()

    if (!item) {
      this.databaseHelper.notFoundByQuery(queryOptionsEnsured.filters)
    }

    return item
  }

  async findManyByDiscussion(
    item: Discussion,
    queryOptions: RequestHelper.QueryOptions<Solution> = {},
  ): Promise<Solution[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('discussion')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        discussionId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
