import { Global, Module } from '@nestjs/common'
import { DatabaseConfigurationService } from './database.configuration.service'

@Global()
@Module({
  imports: [],
  providers: [DatabaseConfigurationService],
  exports: [DatabaseConfigurationService],
})
export class DatabaseConfigurationModule {}
