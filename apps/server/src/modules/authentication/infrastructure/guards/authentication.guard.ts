import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthenticationGuardService } from './authentication.guard.service'

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private service: AuthenticationGuardService,
  ) {}

  canActivate(context: ExecutionContext): Promise<boolean> {
    return this.service.validateRequest(this.reflector, context)
  }
}
