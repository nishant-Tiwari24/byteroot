import { NestFactory } from '@nestjs/core'
import { DatabaseMigrationService } from './core/database'
import { AppMigrationModule } from './modules/app.migration.module'

async function findDataSource() {
  const app = await NestFactory.create(AppMigrationModule)

  const databaseMigrationService = app.get(DatabaseMigrationService)

  const dataSource = databaseMigrationService.getDataSource()

  dataSource.initialize()

  return dataSource
}

const dataSource = findDataSource()

module.exports = { dataSource }
