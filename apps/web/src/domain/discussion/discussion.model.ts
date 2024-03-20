import { Challenge } from '../challenge'

import { User } from '../user'

import { Solution } from '../solution'

export class Discussion {
  id: string

  content: string

  challengeId: string

  challenge?: Challenge

  userId: string

  user?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  solutions?: Solution[]
}
