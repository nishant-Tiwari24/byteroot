import { User } from '../user'

export class Notification {
  id: string
  title: string
  message: string
  senderName?: string
  senderEmail?: string
  senderPictureUrl?: string
  redirectUrl?: string
  userId: string
  user?: User
  dateCreated: string
}
