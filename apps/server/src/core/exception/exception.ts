import { HttpException, HttpStatus } from '@nestjs/common'

export interface IException {
  status: HttpStatus
  code: number
  message?: string
}

export class Exception extends HttpException {
  constructor(options: IException) {
    super({ ...options, type: 'CORE_EXCEPTION' }, options.status)
  }
}
