import { Injectable } from '@nestjs/common'
import { FileHelper } from '@server/helpers/file'
import { EmailType } from '../email.type'
import { SendOptions } from '../providers/provider'
import { Components } from './components'

@Injectable()
export class EmailTemplateService {
  private pathTemplates: string = `${FileHelper.getRoot()}/src/libraries/email/internal/templates`

  private mapping: Record<EmailType, string> = {
    [EmailType.AUTHORIZATION_VERIFICATION_CODE]:
      'authorization-verification-code',
    [EmailType.AUTHENTICATION_WELCOME]: 'authentication-welcome',
    [EmailType.AUTHENTICATION_FORGOT_PASSWORD]:
      'authentication-forgot-password',
    [EmailType.DEFAULT]: 'default',
  }

  get(options: SendOptions): string {
    const values = options.variables ?? { content: options.content }

    const pathBase = this.getPathBase()

    const pathCSS = this.getPathCSS()

    const pathTemplate = this.getPathTemplate(options.type)

    const contentBase = FileHelper.findFileContent(pathBase)

    const contentCSS = FileHelper.findFileContent(pathCSS)

    const contentTemplate = FileHelper.findFileContent(pathTemplate)

    let content = this.buildContent(contentTemplate, values)

    content = this.buildContent(contentBase, { style: contentCSS, content })

    content = this.buildComponents(content)

    return content
  }

  private getPathTemplate(type: EmailType): string {
    const name = this.mapping[type] ?? this.mapping[EmailType.DEFAULT]

    const path = `${this.pathTemplates}/${name}.template.html`

    return path
  }

  private getPathBase(): string {
    const path = `${this.pathTemplates}/base.html`

    return path
  }

  private getPathCSS(): string {
    const path = `${this.pathTemplates}/style.css`

    return path
  }

  private buildContent(content: string, values: Record<string, any>): string {
    let contentBuilt = content

    for (const [key, value] of Object.entries(values)) {
      const token = new RegExp(`\{\{ ${key} \}\}`, 'g')

      contentBuilt = contentBuilt.replace(token, value)
    }

    return contentBuilt
  }

  private buildComponents(content: string): string {
    let contentUpdated = content

    for (const [key, value] of Object.entries(Components)) {
      const tag = new RegExp(`${key}`, 'g')
      contentUpdated = contentUpdated.replace(tag, value)
    }

    return contentUpdated
  }
}
