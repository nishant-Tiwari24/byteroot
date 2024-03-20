import { Request } from 'express'

export namespace RequestHelper {
  export function getPath(request: Request): string {
    return request?.path
  }
  export function getMethod(request: Request): string {
    return request?.method
  }

  export function getBody(request: Request): any {
    return request?.body
  }

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
  }

  export function getQueryOptions(request: Request): QueryOptions {
    const queryOptions = request.query.queryOptions as string

    if (queryOptions) {
      try {
        return JSON.parse(queryOptions)
      } catch (error) {
        throw new Error(error)
      }
    }

    return {}
  }

  export function getAuthorization(request: Request): string {
    const token = request?.headers?.['authorization'] as string

    return token?.replace('Bearer ', '')?.trim()
  }
}
