import { Injectable } from '@nestjs/common'
import { Constraints, UserData } from './accessControl.type'

type CheckOptions = {
  constraints: Constraints
  userData: UserData
}

@Injectable()
export class AccessControlValidator {
  constructor() {}

  async check({ userData, constraints }: CheckOptions): Promise<void | never> {
    const { roles } = constraints

    for (const role of roles) {
      this.checkRole(userData, role)
    }
  }

  private checkRole(userData: UserData, role: string): void | never {
    const isFound = userData.roles.includes(role)

    if (!isFound) {
      const { user, roles } = userData

      throw new Error(
        `User ${user.email} (${user.id}) has role(s) "${roles.join(
          '", "',
        )}" but is missing "${role}"`,
      )
    }
  }
}
