export namespace UserOrchestratorEvent {
  export namespace Verified {
    export const key = 'user.orchestrator.verified'

    export type Payload = {
      userId: string
    }
  }
}
