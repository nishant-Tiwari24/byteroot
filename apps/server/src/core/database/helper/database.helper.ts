import { HttpStatus, Injectable } from '@nestjs/common'
import { ExceptionService } from '@server/core/exception'
import { Utility } from '@server/helpers/utility'
import { Repository, SelectQueryBuilder } from 'typeorm'
import { RequestHelper } from '../../../helpers/request'

@Injectable()
export class DatabaseHelper {
  constructor(private exception: ExceptionService) {}

  applyQueryOptions<Type>(
    repository: Repository<Type>,
    queryOptions: RequestHelper.QueryOptions<Type> = {},
  ): SelectQueryBuilder<Type> {
    const query = repository.createQueryBuilder('entity')

    this.applyIncludes(query, queryOptions)
    this.applyFilters(query, queryOptions)
    this.applyOrders(query, queryOptions)

    return query
  }

  notFoundByQuery(where: Record<string, any>) {
    const keyValues = Object.entries(where)
      .map(([key, value]) => `"${key}"="${value}"`)
      .join(', ')

    return this.exception.throw({
      status: HttpStatus.NOT_FOUND,
      code: 101,
      publicMessage: 'Resource was not found',
      privateMessage: `Resource with ${keyValues} was not found.`,
    })
  }

  invalidQueryWhere(...keys: string[]) {
    const keysString = keys.map(key => `"${key}"`).join(', ')

    return this.exception.throw({
      status: HttpStatus.BAD_REQUEST,
      code: 100,
      publicMessage: 'Resource was not found',
      privateMessage: `Resource where conditions for keys ${keysString} are invalid.`,
    })
  }

  /* --------------------------------- PRIVATE -------------------------------- */

  private applyIncludes<Type>(
    query: SelectQueryBuilder<Type>,
    queryOptions: RequestHelper.QueryOptions<Type>,
  ): void {
    const includes = (queryOptions.includes ?? []) as string[]

    includes.forEach((relation, relationIndex) => {
      const keys = relation.split('.')

      keys.forEach((key, keyIndex) => {
        const suffix = `${relationIndex}_${keyIndex}`
        const keyUnique = `${key}_${suffix}`

        const isRoot = keyIndex === 0

        if (isRoot) {
          query.leftJoinAndSelect(`entity.${key}`, `${keyUnique}`)
        } else {
          const suffixParent = `${relationIndex}_${keyIndex - 1}`
          const keyUniqueParent = `${keys[keyIndex - 1]}_${suffixParent}`

          query.leftJoinAndSelect(`${keyUniqueParent}.${key}`, `${keyUnique}`)
        }
      })
    })
  }

  private applyFilters<Type>(
    query: SelectQueryBuilder<Type>,
    queryOptions: RequestHelper.QueryOptions<Type>,
  ): void {
    const filters: Partial<Type> = queryOptions.filters ?? {}

    const conditions = []
    const values = {}

    for (const [key, value] of Object.entries(filters)) {
      const isArray = Array.isArray(value)

      if (isArray) {
        conditions.push(`entity.${key} IN (:...${key})`)

        values[key] = value
      } else if (typeof value === 'object') {
        const filters = this.buildQueryOptionsFilters(key, value)

        for (const filter of filters) {
          conditions.push(filter.condition)

          values[filter.key] = filter.value
        }
      } else {
        conditions.push(`entity.${key} = :${key}`)

        values[key] = value
      }
    }

    query.where(conditions.join(' AND '), values)
  }

  private applyOrders<Type>(
    query: SelectQueryBuilder<Type>,
    queryOptions: RequestHelper.QueryOptions<Type>,
  ): void {
    const orders: Record<string, 'ASC' | 'DESC'> = queryOptions.orders ?? {}

    let isFirst = true

    for (const [key, value] of Object.entries(orders)) {
      if (!isFirst) {
        query.orderBy(`entity.${key}`, value)

        isFirst = false
      }

      query.addOrderBy(`entity.${key}`, value)
    }
  }

  private buildQueryOptionsFilters(
    key: string,
    filter: RequestHelper.FilterCondition,
  ): { condition: string; key: string; value: any }[] {
    const conditions: {
      condition: string
      key: string
      value: any
    }[] = []

    if (Utility.isDefined(filter.eq)) {
      conditions.push({
        condition: `entity.${key} = :${key}EQ`,
        key: `${key}EQ`,
        value: filter.eq,
      })
    }

    if (Utility.isDefined(filter.neq)) {
      conditions.push({
        condition: `entity.${key} != :${key}NEQ`,
        key: `${key}NEQ`,
        value: filter.neq,
      })
    }

    if (Utility.isDefined(filter.gt)) {
      conditions.push({
        condition: `entity.${key} > :${key}GT`,
        key: `${key}GT`,
        value: filter.gt,
      })
    }

    if (Utility.isDefined(filter.gte)) {
      conditions.push({
        condition: `entity.${key} >= :${key}GTE`,
        key: `${key}GTE`,
        value: filter.gte,
      })
    }

    if (Utility.isDefined(filter.lt)) {
      conditions.push({
        condition: `entity.${key} < :${key}LT`,
        key: `${key}LT`,
        value: filter.lt,
      })
    }

    if (Utility.isDefined(filter.lte)) {
      conditions.push({
        condition: `entity.${key} <= :${key}LTE`,
        key: `${key}LTE`,
        value: filter.lte,
      })
    }

    if (Utility.isDefined(filter.in)) {
      conditions.push({
        condition: `entity.${key} IN (:...${key}IN)`,
        key: `${key}IN`,
        value: filter.in,
      })
    }

    if (Utility.isDefined(filter.nin)) {
      conditions.push({
        condition: `entity.${key} NOT IN (:...${key}NIN)`,
        key: `${key}NIN`,
        value: filter.nin,
      })
    }

    if (Utility.isDefined(filter.like)) {
      conditions.push({
        condition: `entity.${key} LIKE :${key}LIKE`,
        key: `${key}LIKE`,
        value: filter.like,
      })
    }

    if (Utility.isDefined(filter.ilike)) {
      conditions.push({
        condition: `entity.${key} ILIKE :${key}ILIKE`,
        key: `${key}ILIKE`,
        value: filter.ilike,
      })
    }

    return conditions
  }
}
