import { User } from '../user'

import { Challenge } from '../challenge'

export class Userchallenge {
  id: string

  relationType: string

  userId: string

  user?: User

  challengeId: string

  challenge?: Challenge

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
