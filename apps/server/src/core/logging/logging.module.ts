import { Module } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { LoggingInterceptor } from './logging.interceptor'
import { LoggingService } from './logging.service'

@Module({
  imports: [AuthenticationDomainModule],
  providers: [LoggingService],
  exports: [LoggingService],
})
export class LoggingModule {
  static getInterceptors() {
    return [
      {
        provide: APP_INTERCEPTOR,
        useClass: LoggingInterceptor,
      },
    ]
  }
}
