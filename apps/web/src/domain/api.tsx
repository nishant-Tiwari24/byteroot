import { AiApi } from './ai/ai.api'
import { AuthenticationApi } from './authentication/authentication.api'
import { AuthorizationApi } from './authorization/authorization.api'
import { UploadApi } from './upload/upload.api'

import { UserApi } from './user/user.api'

import { NotificationApi } from './notification/notification.api'

import { ChallengeApi } from './challenge/challenge.api'

import { AttemptApi } from './attempt/attempt.api'

import { DiscussionApi } from './discussion/discussion.api'

import { SolutionApi } from './solution/solution.api'

import { UserchallengeApi } from './userchallenge/userchallenge.api'

export namespace Api {
  export class Ai extends AiApi {}
  export class Authentication extends AuthenticationApi {}
  export class Authorization extends AuthorizationApi {}
  export class Upload extends UploadApi {}

  export class User extends UserApi {}

  export class Notification extends NotificationApi {}

  export class Challenge extends ChallengeApi {}

  export class Attempt extends AttemptApi {}

  export class Discussion extends DiscussionApi {}

  export class Solution extends SolutionApi {}

  export class Userchallenge extends UserchallengeApi {}
}
