import { AccessControlRoleStatus } from './accessControl.role'

export namespace AccessControlRoleManager {
  export function isStatusFound(status: AccessControlRoleStatus): boolean {
    return status === 'found'
  }

  export function isStatusNotFound(status: AccessControlRoleStatus): boolean {
    return status === 'not-found'
  }

  export function isStatusUnknown(status: AccessControlRoleStatus): boolean {
    return status === 'unknown'
  }
}
