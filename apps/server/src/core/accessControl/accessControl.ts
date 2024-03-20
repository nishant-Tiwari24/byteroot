import 'reflect-metadata'
import { AccessControlRoleDecorator } from './decorators/accessControl.role.decorator'
import { UserData as UserDataType } from './internal/accessControl.type'

export namespace AccessControl {
  export const Roles = AccessControlRoleDecorator.set

  export const getRoles = AccessControlRoleDecorator.get

  export type UserData = UserDataType
}
