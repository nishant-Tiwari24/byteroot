import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseConfigurationService } from '../configuration/database.configuration.service'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [DatabaseConfigurationService],
      useFactory: (databaseService: DatabaseConfigurationService) => {
        const options = databaseService.getOptions()
        return options
      },
    }),
  ],
  providers: [],
  exports: [],
})
export class DatabaseSetupModule {}
