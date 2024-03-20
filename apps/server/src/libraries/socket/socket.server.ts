import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Utility } from '@server/helpers/utility'
import { Server } from 'socket.io'

@WebSocketGateway({ cors: true })
export class SocketServer implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server

  private clients: Record<string, any> = {}

  constructor() {}

  handleConnection(client: any, ...args: any[]) {
    const token = this.getClientToken(client)

    try {
      const { userId } = this.verifyTokenOrFail(token)

      this.registerClient(userId, client)
    } catch (_) {
      // ignore
    }
  }

  handleDisconnect(client: any) {
    for (const [key, value] of Object.entries(this.clients)) {
      if (value.id === client.id) {
        delete this.clients[key]
        break
      }
    }
  }

  sendToUser(userId: string, key: string, payload: any) {
    const client = this.getClient(userId)

    if (client) {
      client.emit(key, payload)
    }
  }

  private getClientToken(client: any): string {
    return client.handshake.query.token
  }

  private verifyTokenOrFail(token: string): { userId: string } {
    const isUndefined = token === 'undefined' || !Utility.isDefined(token)

    if (isUndefined) {
      throw new Error(`Token is undefined`)
    }

    return { userId: token }
  }

  private registerClient(userId: string, client: any): void {
    if (!this.clients[userId]) {
      this.clients[userId] = client
    }
  }

  private getClient(userId: string): any {
    return this.clients[userId]
  }
}
