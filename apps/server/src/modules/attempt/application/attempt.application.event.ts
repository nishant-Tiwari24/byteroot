export namespace AttemptApplicationEvent {
  export namespace AttemptCreated {
    export const key = 'attempt.application.attempt.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
