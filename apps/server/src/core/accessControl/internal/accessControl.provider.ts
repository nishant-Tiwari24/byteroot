import { Request } from 'express'
import { UserData } from './accessControl.type'

export interface AccessControlProvider {
  findUserData: (request: Request) => Promise<UserData>

  onError: (error: Error) => never
}
