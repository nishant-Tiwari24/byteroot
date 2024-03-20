import { Injectable } from '@nestjs/common'
import { ConfigurationService } from '@server/core/configuration'
import { Logger, LoggerService } from '@server/libraries/logger'
import Mailjet from 'node-mailjet'
import { EmailSender, EmailType } from '../../email.type'
import { EmailTemplateService } from '../../templates/email.template.service'
import { Provider, SendOptions } from '../provider'

@Injectable()
export class MailjetProvider implements Provider {
  private logger: Logger
  private client: Mailjet

  private templateIds: Record<EmailType, number> = {
    [EmailType.DEFAULT]: null,
    [EmailType.AUTHENTICATION_WELCOME]: null,
    [EmailType.AUTHENTICATION_FORGOT_PASSWORD]: null,
    [EmailType.AUTHORIZATION_VERIFICATION_CODE]: null,
  }

  constructor(
    private configurationService: ConfigurationService,
    private loggerService: LoggerService,
    private templateService: EmailTemplateService,
  ) {
    this.logger = this.loggerService.create({ name: 'MailjetProvider' })

    this.initialise()
  }

  private initialise(): void {
    const isProduction = this.configurationService.isEnvironmentProduction()

    if (!isProduction) {
      this.logger.warning(`Mailjet is disabled in development`)
      return
    }

    try {
      const apiKey = this.configurationService.get(
        'SERVER_EMAIL_MAILJET_API_KEY',
      )
      const secretKey = this.configurationService.get(
        'SERVER_EMAIL_MAILJET_SECRET_KEY',
      )

      if (!apiKey || !secretKey) {
        this.logger.warning(
          `Set EMAIL_MAILJET_API_KEY and EMAIL_MAILJET_SECRET_KEY to activate Mailjet`,
        )
        return
      }

      this.client = new Mailjet({ apiKey, apiSecret: secretKey })

      this.logger.success(`Mailjet service active`)
    } catch (error) {
      this.logger.error(`Could not start Mailjet service`)
      this.logger.error(error)
    }
  }

  async send(options: SendOptions): Promise<void> {
    const message = this.buildMessage(options)

    return this.client
      .post('send', { version: 'v3.1' })
      .request({
        Messages: [
          {
            ...message,
          },
        ],
      })
      .then(result => {
        this.logger.log(`Emails sent`, result)
      })
      .catch(error => {
        this.logger.error(`Could not send emails (${error.statusCode})`)
      })
  }

  private buildMessage(options: SendOptions): {
    From: { Email: string; Name: string }
    To: { Email: string; Name: string }[]
    Subject: string
    HTMLPart?: string
    Variables?: Record<string, any>
    TemplateLanguage?: boolean
    templateId?: number
  } {
    const from = {
      Email: EmailSender.default.email,
      Name: EmailSender.default.name,
    }

    const to = options.to.map(item => ({ Email: item.email, Name: item.name }))

    const message = {
      From: from,
      To: to,
      Subject: options.subject,
      HTMLPart: undefined,
      Variables: undefined,
      TemplateLanguage: undefined,
      templateId: undefined,
    }

    const templateId = this.templateIds[options.type]

    if (templateId) {
      message.TemplateLanguage = true
      message.templateId = templateId
      message.Variables = options.variables
    } else {
      const content = this.templateService.get(options)

      message.HTMLPart = content
    }

    return message
  }
}
