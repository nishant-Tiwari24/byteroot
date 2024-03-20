import { Injectable } from '@nestjs/common'
import { SocketServer } from './socket.server'

@Injectable()
export class SocketService {
  constructor(private socketServer: SocketServer) {}

  send(userId: string, key: string, payload: any): void {
    this.socketServer.sendToUser(userId, key, payload)
  }
}
