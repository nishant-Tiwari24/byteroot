import { EmailType } from '../email.type'

export type SendOptions = {
  subject: string

  content?: string

  type: EmailType

  variables?: Record<string, any>

  to: {
    email: string
    name: string
  }[]
}

export interface Provider {
  send(options: SendOptions): Promise<void>
}
