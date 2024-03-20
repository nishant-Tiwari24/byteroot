import { Injectable } from '@nestjs/common'
import { ConfigurationService } from '@server/core/configuration'
import { Logger, LoggerService } from '../logger'
import { EmailType } from './internal/email.type'
import { MailjetProvider } from './internal/providers/mailjet/mailjet.provider'
import { NodemailerProvider } from './internal/providers/nodemailer/nodemailer.provider'
import { Provider } from './internal/providers/provider'

type SendOptions = {
  name: string
  email: string
  subject: string
  type: EmailType
  content?: string
  variables: Record<string, string>
}

@Injectable()
export class EmailService {
  private logger: Logger
  private provider: Provider

  public Type = EmailType

  constructor(
    private loggerService: LoggerService,
    private configurationService: ConfigurationService,
    private nodemailerProvider: NodemailerProvider,
    private mailjetProvider: MailjetProvider,
  ) {
    this.logger = this.loggerService.create({ name: 'EmailService' })

    const isProduction = this.configurationService.isEnvironmentProduction()

    if (isProduction) {
      this.provider = this.mailjetProvider
    } else {
      this.provider = this.nodemailerProvider
    }
  }

  async send(options: SendOptions): Promise<void> {
    return this.provider
      .send({
        type: options.type,
        content: options.content,
        to: [
          {
            name: options.name,
            email: options.email,
          },
        ],
        variables: options.variables,
        subject: options.subject,
      })
      .then(() => {
        this.logger.log(`Email sent to ${options.email}`, options)
      })
  }
}
