import { ExecutionContext, SetMetadata } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import 'reflect-metadata'

export namespace Authentication {
  const KEY_PUBLIC = 'authentication.public'
  const KEY_USER_NOT_VERIFIED = 'authentication.user-not-verified'

  export const AllowUserNotVerified = () =>
    SetMetadata(KEY_USER_NOT_VERIFIED, true)

  export function isUserNotVerifiedAllowed(
    context: ExecutionContext,
    reflector: Reflector,
  ): boolean {
    return getValue(context, reflector, KEY_USER_NOT_VERIFIED)
  }

  export const Public = () => SetMetadata(KEY_PUBLIC, true)

  export function isPublic(
    context: ExecutionContext,
    reflector: Reflector,
  ): boolean {
    return getValue(context, reflector, KEY_PUBLIC)
  }

  function getValue(
    context: ExecutionContext,
    reflector: Reflector,
    key: string,
  ): any {
    return reflector.getAllAndOverride<boolean>(key, [
      context.getHandler(),
      context.getClass(),
    ])
  }
}
