import { useAuthenticationGoogle } from './hooks/authentication.google.hook'
import { useAuthenticationLogin } from './hooks/authentication.login.hook'
import { useAuthenticationRegister } from './hooks/authentication.register.hook'
import { useAuthenticationResetPassword } from './hooks/authentication.resetPassword.hook'
import { useAuthenticationSendResetPassword } from './hooks/authentication.sendResetPassword.hook'
import { useAuthenticationToken } from './hooks/authentication.token.hook'

export namespace AuthenticationHook {
  export const useLogin = useAuthenticationLogin
  export const useRegister = useAuthenticationRegister
  export const useGoogle = useAuthenticationGoogle
  export const useSendResetPassword = useAuthenticationSendResetPassword
  export const useResetPassword = useAuthenticationResetPassword
  export const useToken = useAuthenticationToken
}
