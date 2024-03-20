import { Module } from '@nestjs/common'
import { DatabaseHelper } from './database.helper'

@Module({
  imports: [],
  providers: [DatabaseHelper],
  exports: [DatabaseHelper],
})
export class DatabaseHelperModule {}
