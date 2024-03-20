export namespace ApiHelper {
  export type FilterCondition = {
    eq?: number // Equal to
    neq?: number // Not equal to
    gt?: number // Greater than
    gte?: number // Greater than or equal to
    lt?: number // Less than
    lte?: number // Less than or equal to
    in?: any[] // In array
    nin?: any[] // Not in array
    like?: string // case sensitive
    ilike?: string // not case sensitive
  }

  export type QueryOptions<Model = any> = {
    filters?: Partial<Record<keyof Model, any | any[] | FilterCondition>>
    orders?: Partial<Record<keyof Model, 'ASC' | 'DESC'>>
    includes?: string[]
    pagination?: {
      page?: number
      countItems?: number
    }
  }

  export function buildQueryOptions(options: QueryOptions): string {
    if (options) {
      return `?queryOptions=${JSON.stringify(options)}`
    } else {
      return ``
    }
  }
}
