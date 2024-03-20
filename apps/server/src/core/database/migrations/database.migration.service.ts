import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { DatabaseConfigurationService } from '../configuration/database.configuration.service'

@Injectable()
export class DatabaseMigrationService {
  constructor(private databaseConfiguration: DatabaseConfigurationService) {}

  getDataSource(): DataSource {
    const options = this.databaseConfiguration.getOptionsMigration()

    const dataSource = new DataSource({
      ...options,
    })

    return dataSource
  }
}
