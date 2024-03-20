export namespace SolutionApplicationEvent {
  export namespace SolutionCreated {
    export const key = 'solution.application.solution.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
