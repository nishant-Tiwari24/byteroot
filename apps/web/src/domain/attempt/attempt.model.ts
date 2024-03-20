import { User } from '../user'

import { Challenge } from '../challenge'

export class Attempt {
  id: string

  status: string

  userId: string

  user?: User

  challengeId: string

  challenge?: Challenge

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
