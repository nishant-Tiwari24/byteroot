import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { AuthorizationDomainEvent } from '@server/modules/authorization/domain/authorization.domain.event'
import { EmailService } from '../../../../libraries/email'
import { UserDomainFacade } from '../../../user/domain'
import { AuthorizationCode, AuthorizationDomainFacade } from '../../domain'

@Injectable()
export class AuthorizationCommunicationSubscriber {
  constructor(
    private userDomainFacade: UserDomainFacade,
    private authorizationDomainFacade: AuthorizationDomainFacade,
    private emailService: EmailService,
  ) {}

  @OnEvent(AuthorizationDomainEvent.CodeCreated.key)
  async handleCodeCreated(data: AuthorizationDomainEvent.CodeCreated.Payload) {
    const code = await this.authorizationDomainFacade.code.findOneByIdOrFail(
      data.authorizationCodeId,
    )

    const user =
      await this.userDomainFacade.findOneByAuthorizationCodeOrFail(code)

    const keyPrivate = this.authorizationDomainFacade.code.getKeyPrivate(code)

    const type = this.emailService.Type.AUTHORIZATION_VERIFICATION_CODE

    await this.emailService.send({
      type,
      email: user.email,
      name: user.name ?? user.email,
      subject: `Single-use verification code`,
      variables: {
        code: keyPrivate,
        expiration: this.getExpiration(code),
      },
    })
  }

  private getExpiration(code: AuthorizationCode): string {
    const durationMinutes = code.durationMinutes

    const minutes = durationMinutes % 60
    const hours = (durationMinutes - minutes) / 60

    if (minutes > 0 && hours > 0) {
      return `${hours} hours and ${minutes} minutes`
    }

    if (minutes > 0) {
      return `${minutes} minutes`
    }

    if (hours > 1) {
      return `${hours} hours`
    }

    return `${hours} hour`
  }
}
