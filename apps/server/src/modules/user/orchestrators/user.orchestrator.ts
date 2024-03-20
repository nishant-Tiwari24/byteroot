import { Injectable } from '@nestjs/common'
import { UserOrchestratorEvent } from './user.orchestrator.event'
import { User, UserDomainFacade } from '../domain'
import { EventService } from '@server/libraries/event'

@Injectable()
export class UserOrchestrator {
  constructor(
    private userDomainFacade: UserDomainFacade,
    private event: EventService,
  ) {}

  getCodeValues(): {
    durationMinutes: number
  } {
    return {
      durationMinutes: 60,
    }
  }

  async onSuccess(user: User): Promise<void> {
    await this.userDomainFacade.setVerified(user)

    this.event.emit<UserOrchestratorEvent.Verified.Payload>(
      UserOrchestratorEvent.Verified.key,
      { userId: user.id },
    )
  }
}
