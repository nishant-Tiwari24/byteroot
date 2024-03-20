import { Global, Module } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'
import { ExceptionFilter } from './exception.filter'
import { ExceptionService } from './exception.service'

@Global()
@Module({
  providers: [ExceptionService],
  exports: [ExceptionService],
})
export class ExceptionModule {
  static getFilters() {
    return [
      {
        provide: APP_FILTER,
        useClass: ExceptionFilter,
      },
    ]
  }
}
