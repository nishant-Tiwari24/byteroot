import { ExecutionContext, SetMetadata } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

export namespace AccessControlRoleDecorator {
  const KEY = 'access-control.roles'

  export const set = (...names: string[]) => SetMetadata(KEY, names)

  export function get(
    context: ExecutionContext,
    reflector: Reflector,
  ): string[] {
    return (
      reflector.getAllAndOverride<string[]>(KEY, [
        context.getHandler(),
        context.getClass(),
      ]) ?? []
    )
  }
}
