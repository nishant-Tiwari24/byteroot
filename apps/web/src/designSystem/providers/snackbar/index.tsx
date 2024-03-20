import { SnackbarProvider } from 'notistack'
import React, { ReactNode } from 'react'

/**
 * @provider Snackbar
 * @description Notistack is a React library which makes it super easy to display notifications on your web apps
 * @usage `const { enqueueSnackbar } = useSnackbar()`
 * @import import { useSnackbar } from 'notistack'
 * @function {(message: string, {variant: 'error' | 'success' | 'info'}) => void} enqueueSnackbar - Display a toast to the user

 */
export namespace Snackbar {
  export const Provider: React.FC<{ children: ReactNode }> = ({ children }) => {
    return <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>
  }
}
