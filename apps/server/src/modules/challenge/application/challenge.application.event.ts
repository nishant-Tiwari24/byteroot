export namespace ChallengeApplicationEvent {
  export namespace ChallengeCreated {
    export const key = 'challenge.application.challenge.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
