import { Module } from '@nestjs/common'
import { DatabaseMigrationService } from './database.migration.service'

@Module({
  imports: [],
  providers: [DatabaseMigrationService],
  exports: [DatabaseMigrationService],
})
export class DatabaseMigrationModule {}
