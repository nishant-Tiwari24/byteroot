import { Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'

@Injectable()
export class EventService {
  constructor(private eventEmitter: EventEmitter2) {}

  async emit<PayloadType>(key: string, payload: PayloadType): Promise<void> {
    this.eventEmitter.emit(key, payload)
  }
}
