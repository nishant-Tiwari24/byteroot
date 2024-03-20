import { User, UserStatus } from './user.model'

export namespace UserManager {
  export function isVerified(user: User): boolean {
    return user?.status === UserStatus.VERIFIED
  }
}
