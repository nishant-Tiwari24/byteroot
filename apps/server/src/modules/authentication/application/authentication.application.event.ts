export namespace AuthenticationApplicationEvent {
  export namespace UserPasswordResetRequested {
    export const key =
      'authentication.application.user-password-reset-requested'

    export type Payload = {
      userId: string
    }
  }

  export namespace UserRegistered {
    export const key = 'authentication.application.user-registered'

    export type Payload = {
      userId: string
    }
  }
}
