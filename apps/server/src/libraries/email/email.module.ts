import { Module } from '@nestjs/common'
import { EmailService } from './email.service'
import { MailjetProvider } from './internal/providers/mailjet/mailjet.provider'
import { NodemailerProvider } from './internal/providers/nodemailer/nodemailer.provider'
import { EmailTemplateService } from './internal/templates/email.template.service'

@Module({
  imports: [],
  providers: [
    EmailService,
    NodemailerProvider,
    MailjetProvider,
    EmailTemplateService,
  ],
  exports: [EmailService],
})
export class EmailModule {}
