import { Module } from '@nestjs/common'
import { SocketServer } from './socket.server'
import { SocketService } from './socket.service'

@Module({
  imports: [],
  providers: [SocketService, SocketServer],
  exports: [SocketService],
})
export class SocketModule {}
