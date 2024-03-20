export namespace DiscussionApplicationEvent {
  export namespace DiscussionCreated {
    export const key = 'discussion.application.discussion.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
