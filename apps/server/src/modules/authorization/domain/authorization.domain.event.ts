export namespace AuthorizationDomainEvent {
  export namespace CodeCreated {
    export const key = 'authorization-code.domain.created'

    export type Payload = {
      authorizationCodeId: string
    }
  }
}
