export namespace AuthenticationManager {
  export function isErrorLoggedOut(code: number, status: number): boolean {
    return status === 401 && code === 0
  }
}
