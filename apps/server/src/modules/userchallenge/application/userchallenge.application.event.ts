export namespace UserchallengeApplicationEvent {
  export namespace UserchallengeCreated {
    export const key = 'userchallenge.application.userchallenge.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
