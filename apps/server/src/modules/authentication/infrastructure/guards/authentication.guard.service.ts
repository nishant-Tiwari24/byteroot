import { ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Authentication } from '@server/core/authentication'
import { ContextHelper } from '@server/helpers/context'
import { CookieService } from '../../../../core/cookie'
import { User, UserDomainFacade } from '../../../user/domain'
import { AuthenticationDomainFacade } from '../../domain'
import { AuthenticationInfrastructureException } from '../authentication.infrastructure.exception'

@Injectable()
export class AuthenticationGuardService {
  constructor(
    private cookieService: CookieService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
    private userDomainFacade: UserDomainFacade,
    private exception: AuthenticationInfrastructureException,
  ) {}

  async validateRequest(
    reflector: Reflector,
    context: ExecutionContext,
  ): Promise<boolean> {
    const isPublic = Authentication.isPublic(context, reflector)

    if (isPublic) {
      return true
    }

    const request = ContextHelper.toRequest(context)

    const token = this.authenticationDomainFacade.getAccessToken(request)

    let userId: string

    try {
      const payload = this.authenticationDomainFacade.verifyTokenOrFail(token)

      userId = payload.userId
    } catch (error) {
      this.exception.invalidAccessToken()
    }

    const user = await this.userDomainFacade.findOneByIdOrFail(userId)

    await this.checkUserNotVerified(reflector, context, user)

    this.authenticationDomainFacade.assignRequestPayload(request, { user })

    return true
  }

  async checkUserNotVerified(
    reflector: Reflector,
    context: ExecutionContext,
    user: User,
  ): Promise<void> {
    const isUserNotVerifiedAllowed = Authentication.isUserNotVerifiedAllowed(
      context,
      reflector,
    )

    if (isUserNotVerifiedAllowed) {
      return
    }

    const isVerified = await this.userDomainFacade.isVerified(user)

    if (isVerified) {
      return
    }

    this.exception.userNotVerified(user)
  }
}
