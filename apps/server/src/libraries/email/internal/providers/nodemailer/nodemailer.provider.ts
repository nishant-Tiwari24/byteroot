import { Injectable } from '@nestjs/common'
import * as NodemailerSDK from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'
import { ConfigurationService } from '../../../../../core/configuration'
import { Logger, LoggerService } from '../../../../logger'
import { EmailSender } from '../../email.type'
import { EmailTemplateService } from '../../templates/email.template.service'
import { Provider, SendOptions } from '../provider'

@Injectable()
export class NodemailerProvider implements Provider {
  private logger: Logger
  private client: Mail

  constructor(
    private loggerService: LoggerService,
    private configurationService: ConfigurationService,
    private templateService: EmailTemplateService,
  ) {
    this.logger = this.loggerService.create({ name: 'NodemailerProvider' })

    this.initialise()
  }

  private initialise() {
    try {
      const host =
        this.configurationService.get('SERVER_EMAIL_MAILPIT_HOST') ??
        'localhost'

      const port = this.configurationService.getNumber(
        'SERVER_EMAIL_MAILPIT_PORT',
        1022,
      )

      this.client = NodemailerSDK.createTransport({
        host,
        port,
      })

      this.logger.success(`Nodemailer is active (${host}:${port})`)
    } catch (error) {
      this.logger.error(`Nodemailer failed to start: ${error.message}`)
    }
  }

  async send(options: SendOptions): Promise<void> {
    const from = EmailSender.default

    const content = this.templateService.get(options)

    for (const to of options.to) {
      await this.client
        .sendMail({
          from: `${from.name} <${from.email}>`,
          to: to.email,
          subject: options.subject,
          html: content,
        })
        .then(result => {
          this.logger.log(`Emails sent`)
        })
        .catch(error => {
          this.logger.error(`Could not send emails (${error.statusCode})`)
          this.logger.error(error)
        })
    }
  }
}
