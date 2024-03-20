import { Api } from '@web/domain'
import { CoreStoreContext } from '../../core/store/store'

export namespace GlobalService {
  type InitialiseStoreOptions = {
    store: CoreStoreContext
  }

  export const initialiseStore = async ({
    store,
  }: InitialiseStoreOptions): Promise<void> => {
    // intialise your store here

    Api.Authorization.getPermissions()
      .then(({ roles }) => store.setRoles(roles))
      .catch(() => {})

    Api.Notification.findManyByMe()
      .then(notifications => store.setNotifications(notifications))
      .catch(() => {})
  }

  type CleanOptions = {
    store: CoreStoreContext
  }

  export const cleanStore = async ({ store }: CleanOptions): Promise<void> => {
    // clean your store here
    store.setRoles([])
  }
}
