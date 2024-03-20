import { User } from '@server/modules/user/domain'

export type UserData = {
  user: User
  roles: string[]
}

export type Constraints = {
  roles: string[]
}
