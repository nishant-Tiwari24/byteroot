import { User } from '../user'

import { Attempt } from '../attempt'

import { Discussion } from '../discussion'

import { Userchallenge } from '../userchallenge'

export class Challenge {
  id: string

  name: string

  description?: string

  imageUrl?: string

  sampleInput: string

  sampleOutput: string

  difficultyLevel: string

  programmingLanguage: string

  userId: string

  user?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  attempts?: Attempt[]

  discussions?: Discussion[]

  userchallenges?: Userchallenge[]
}
