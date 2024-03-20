import { Module } from '@nestjs/common'
import { ExceptionModule } from '@server/core/exception'
import { EventModule } from '@server/libraries/event'
import { ConfigurationModule } from '../core/configuration/configuration.module'
import {
  DatabaseConfigurationModule,
  DatabaseMigrationModule,
  DatabaseSetupModule,
} from '../core/database'
import { LoggerModule } from '../libraries/logger'
import { AppDomainModule } from './app.domain.module'

@Module({
  imports: [
    ConfigurationModule,
    LoggerModule,
    ExceptionModule,
    EventModule,
    DatabaseConfigurationModule,
    DatabaseSetupModule,
    DatabaseMigrationModule,
    AppDomainModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppMigrationModule {}
