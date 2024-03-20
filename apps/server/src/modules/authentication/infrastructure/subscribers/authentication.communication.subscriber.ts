import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { UserOrchestratorEvent } from '@server/modules/user/orchestrators/user.orchestrator.event'
import { ConfigurationService } from '../../../../core/configuration'
import { EmailService } from '../../../../libraries/email'
import { UserDomainFacade } from '../../../user/domain'
import { AuthenticationApplicationEvent } from '../../application'
import { AuthenticationDomainFacade } from '../../domain'

@Injectable()
export class AuthenticationCommunicationSubscriber {
  constructor(
    private configurationService: ConfigurationService,
    private userDomainFacade: UserDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
    private emailService: EmailService,
  ) {}

  @OnEvent(UserOrchestratorEvent.Verified.key)
  async handleUserRegistered(data: { userId: string }) {
    const user = await this.userDomainFacade.findOneByIdOrFail(data.userId)

    const type = this.emailService.Type.AUTHENTICATION_WELCOME

    await this.emailService.send({
      type,
      email: user.email,
      name: user.name ?? user.email,
      subject: `Welcome`,
      variables: {},
    })
  }

  @OnEvent(AuthenticationApplicationEvent.UserPasswordResetRequested.key)
  async handleResetPassword(data: { userId: string }) {
    const user = await this.userDomainFacade.findOneByIdOrFail(data.userId)

    const token = this.authenticationDomainFacade.buildTokenResetPassword(user)

    const url = this.configurationService.getClientBaseUrl()

    const urlResetPassword = `${url}/reset-password/${token}`

    const type = this.emailService.Type.AUTHENTICATION_FORGOT_PASSWORD

    await this.emailService.send({
      type,
      email: user.email,
      name: user.name ?? user.email,
      subject: `Reset your password`,
      variables: {
        url_password_reset: urlResetPassword,
      },
    })
  }
}
