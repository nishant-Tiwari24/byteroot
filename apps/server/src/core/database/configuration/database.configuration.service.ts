import { Injectable } from '@nestjs/common'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { DataSourceOptions } from 'typeorm'
import { ConfigurationService } from '../../configuration'

@Injectable()
export class DatabaseConfigurationService {
  constructor(private configurationService: ConfigurationService) {}

  getOptions(): TypeOrmModuleOptions {
    const isProduction = this.configurationService.isEnvironmentProduction()

    if (isProduction) {
      return {
        ...this.getOptionsBase(),
        ...this.getOptionsCommon(),
        ...this.getOptionsProduction(),
      } as TypeOrmModuleOptions
    } else {
      return {
        ...this.getOptionsBase(),
        ...this.getOptionsCommon(),
        ...this.getOptionsDevelopment(),
      } as TypeOrmModuleOptions
    }
  }

  getOptionsMigration(): DataSourceOptions {
    const isProduction = this.configurationService.isEnvironmentProduction()

    const options: DataSourceOptions = {
      ...this.getOptionsBase(),
      migrationsTableName: 'typeorm_migrations',
      migrations: ['src/core/database/migrations/scripts/*.ts'],
      entities: ['src/modules/**/*.model.ts'],
    }

    if (isProduction) {
      return {
        ...options,
        ssl: {
          rejectUnauthorized: false,
        },
      }
    } else {
      return {
        ...options,
      }
    }
  }

  private getOptionsBase(): {
    type: 'postgres'
    username: string
    password: string
    host: string
    port: number
    database: string
    ssl?: {
      rejectUnauthorized: boolean
    }
  } {
    const url =
      this.configurationService.get('DATABASE_URL') ??
      this.configurationService.get('SERVER_DATABASE_URL')

    const username = url.split('//')[1].split(':')[0]
    const password = url.split(':')[2].split('@')[0]
    const host = url.split('@')[1].split(':')[0]
    const port = Number(url.split(':')[3].split('/')[0])
    const database = url.split('/').slice(-1)[0]

    const isAmazon = host.includes('amazonaws.com')

    const options = {
      type: 'postgres',
      host,
      username,
      password,
      port,
      database,
    }

    if (isAmazon) {
      options['ssl'] = {
        rejectUnauthorized: false,
      }
    }

    return options as any
  }

  private isMigrationActive(): boolean {
    return this.configurationService.getBoolean('DATABASE_MIGRATION_ACTIVE')
  }

  private getOptionsCommon(): Partial<TypeOrmModuleOptions> {
    return {
      autoLoadEntities: true,
    }
  }

  private getOptionsDevelopment(): Partial<TypeOrmModuleOptions> {
    return {
      synchronize: !this.isMigrationActive(),
    }
  }

  private getOptionsProduction(): Partial<TypeOrmModuleOptions> {
    return {
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }
  }
}
