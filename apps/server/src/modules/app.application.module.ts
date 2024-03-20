import { Module } from '@nestjs/common'
import { AuthenticationApplicationModule } from './authentication/application'
import { AuthorizationApplicationModule } from './authorization/application'
import { UserApplicationModule } from './user/application'

import { ChallengeApplicationModule } from './challenge/application'

import { AttemptApplicationModule } from './attempt/application'

import { DiscussionApplicationModule } from './discussion/application'

import { SolutionApplicationModule } from './solution/application'

import { UserchallengeApplicationModule } from './userchallenge/application'

import { AiApplicationModule } from './ai/application/ai.application.module'
import { NotificationApplicationModule } from './notification/application/notification.application.module'
import { UploadApplicationModule } from './upload/application/upload.application.module'

@Module({
  imports: [
    AuthenticationApplicationModule,
    UserApplicationModule,
    AuthorizationApplicationModule,
    NotificationApplicationModule,
    AiApplicationModule,
    UploadApplicationModule,

    ChallengeApplicationModule,

    AttemptApplicationModule,

    DiscussionApplicationModule,

    SolutionApplicationModule,

    UserchallengeApplicationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppApplicationModule {}
