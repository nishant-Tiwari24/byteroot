import { AuthorizationRole as AuthorizationRoleModel } from './authorization/authorization.model'

import { User as UserModel } from './user/user.model'

import { Notification as NotificationModel } from './notification/notification.model'

import { Challenge as ChallengeModel } from './challenge/challenge.model'

import { Attempt as AttemptModel } from './attempt/attempt.model'

import { Discussion as DiscussionModel } from './discussion/discussion.model'

import { Solution as SolutionModel } from './solution/solution.model'

import { Userchallenge as UserchallengeModel } from './userchallenge/userchallenge.model'

export namespace Model {
  export class AuthorizationRole extends AuthorizationRoleModel {}

  export class User extends UserModel {}

  export class Notification extends NotificationModel {}

  export class Challenge extends ChallengeModel {}

  export class Attempt extends AttemptModel {}

  export class Discussion extends DiscussionModel {}

  export class Solution extends SolutionModel {}

  export class Userchallenge extends UserchallengeModel {}
}
