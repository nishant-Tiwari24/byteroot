import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AccessControlService } from '../internal/accessControl.service'

@Injectable()
export class AccessControlGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private service: AccessControlService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    return this.service.run(this.reflector, context)
  }
}
