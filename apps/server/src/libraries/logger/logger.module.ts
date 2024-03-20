import { Global, Module } from '@nestjs/common'
import { DatadogService } from './internal/datadog.service'
import { WinstonService } from './internal/winston.service'
import { LoggerService } from './logger.service'

@Global()
@Module({
  imports: [],
  providers: [WinstonService, DatadogService, LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
