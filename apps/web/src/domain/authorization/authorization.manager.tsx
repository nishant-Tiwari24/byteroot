import { AuthorizationRole } from './authorization.model'

export namespace AuthorizationManager {
  export function isErrorCodeIncorrect(code: number, status: number): boolean {
    return status === 403 && code === 1
  }

  export function isErrorCodeExpired(code: number, status: number): boolean {
    return status === 403 && code === 2
  }

  export function isAdmin(role: AuthorizationRole): boolean {
    return role.name === 'admin'
  }
}
