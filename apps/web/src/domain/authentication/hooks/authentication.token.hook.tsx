import { HttpService } from '@web/core/http'

interface ReturnType {
  setToken: (token: string) => void
  getToken: () => string
  removeToken: () => void
}

export const useAuthenticationToken = (): ReturnType => {
  const LOCAL_STORAGE_TOKEN = 'ACCESS_TOKEN'

  const setToken = (token: string) => {
    if (token) {
      localStorage.setItem(LOCAL_STORAGE_TOKEN, token)
      HttpService.api.setAccessToken(token)
    }
  }

  const removeToken = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN)
    HttpService.api.setAccessToken(null)
  }

  const getToken = (): string => {
    return localStorage.getItem(LOCAL_STORAGE_TOKEN)
  }

  return {
    setToken,
    getToken,
    removeToken,
  }
}
