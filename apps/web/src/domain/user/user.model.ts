import { Notification } from '../notification'

import { Challenge } from '../challenge'

import { Attempt } from '../attempt'

import { Discussion } from '../discussion'

import { Userchallenge } from '../userchallenge'

export enum UserStatus {
  CREATED = 'CREATED',
  VERIFIED = 'VERIFIED',
}
export class User {
  id: string
  email: string
  status: UserStatus
  name: string
  pictureUrl: string
  password: string
  dateCreated: string
  dateUpdated: string
  notifications?: Notification[]

  challenges?: Challenge[]

  attempts?: Attempt[]

  discussions?: Discussion[]

  userchallenges?: Userchallenge[]
}
