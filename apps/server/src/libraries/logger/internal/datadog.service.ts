import { Injectable } from '@nestjs/common'
import tracer from 'dd-trace'

@Injectable()
export class DatadogService {
  constructor() {
    tracer.init({
      logInjection: true,
    })
  }
}
