import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Userchallenge } from './userchallenge.model'

import { User } from '../../user/domain'

import { Challenge } from '../../challenge/domain'

@Injectable()
export class UserchallengeDomainFacade {
  constructor(
    @InjectRepository(Userchallenge)
    private repository: Repository<Userchallenge>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Userchallenge>): Promise<Userchallenge> {
    return this.repository.save(values)
  }

  async update(
    item: Userchallenge,
    values: Partial<Userchallenge>,
  ): Promise<Userchallenge> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Userchallenge): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Userchallenge> = {},
  ): Promise<Userchallenge[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Userchallenge> = {},
  ): Promise<Userchallenge> {
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

  async findManyByUser(
    item: User,
    queryOptions: RequestHelper.QueryOptions<Userchallenge> = {},
  ): Promise<Userchallenge[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('user')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        userId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }

  async findManyByChallenge(
    item: Challenge,
    queryOptions: RequestHelper.QueryOptions<Userchallenge> = {},
  ): Promise<Userchallenge[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('challenge')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        challengeId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
