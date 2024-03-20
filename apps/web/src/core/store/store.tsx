import { Model } from '@web/domain'
import { AuthorizationManager } from '@web/domain/authorization'
import { ReactNode, createContext, useContext, useState } from 'react'

export type CoreStoreContext = {
  roles: Model.AuthorizationRole[]
  setRoles: (roles: Model.AuthorizationRole[]) => void

  notifications: Model.Notification[]
  setNotifications: (notifications: Model.Notification[]) => void

  isAdmin: boolean
}

const StoreContext = createContext<CoreStoreContext>(undefined)

export const useCoreStore = (): CoreStoreContext => {
  return useContext(StoreContext)
}

type Props = {
  children: ReactNode
}

export const CoreStoreProvider: React.FC<Props> = ({ children }) => {
  const [roles, setRoles] = useState<Model.AuthorizationRole[]>([])
  const [notifications, setNotifications] = useState<Model.Notification[]>([])

  const isAdmin = roles.some(role => AuthorizationManager.isAdmin(role))

  return (
    <StoreContext.Provider
      value={{ roles, setRoles, notifications, setNotifications, isAdmin }}
    >
      {children}
    </StoreContext.Provider>
  )
}
