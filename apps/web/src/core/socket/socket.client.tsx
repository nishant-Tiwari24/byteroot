import { Socket, io } from 'socket.io-client'

type ConstructorOptions = {
  baseUrl: string
  token: string
}

export class SocketClient {
  instance: Socket

  constructor(options: ConstructorOptions) {
    this.instance = io(options.baseUrl, {
      query: {
        token: options.token,
      },
    })
  }

  onStarted(callback: () => any): void {
    this.instance.on('connect', () => {
      callback()
    })
  }

  stop(): void {
    this.instance.disconnect()
  }

  listen<DataType>(key: string, callback: (data: DataType) => any) {
    this.instance.on(key, data => {
      callback(data)
    })
  }
}
