import { Injectable } from '@nestjs/common'
import { ConfigurationService } from '@server/core/configuration'
import { LoggerService } from '../logger'
import { UploadAWS } from './internal/providers/aws/aws'
import { UploadLocalProvider } from './internal/providers/local/upload.local.provider'
import { UploadProvider } from './upload.provider'
import { UploadFileType } from './upload.type'

@Injectable()
export class UploadService {
  private instance: UploadProvider

  constructor(
    private configurationService: ConfigurationService,
    private loggerService: LoggerService,
  ) {
    this.instance = this.createInstance()
  }

  private isMocked(): boolean {
    const isDevelopment = this.configurationService.isEnvironmentDevelopment()
    return isDevelopment
  }

  private createInstance(): UploadProvider {
    if (this.isMocked()) {
      return new UploadLocalProvider(
        this.loggerService,
        this.configurationService,
      )
    } else {
      return new UploadAWS(this.loggerService, this.configurationService)
    }
  }

  async uploadPublic(...files: UploadFileType[]): Promise<{ url: string }[]> {
    const responses = []

    for (const file of files) {
      const response = await this.instance.uploadPublic({ file })

      responses.push(response)
    }

    return responses
  }

  async uploadPrivate(...files: UploadFileType[]): Promise<{ url: string }[]> {
    const responses = []

    for (const file of files) {
      const response = await this.instance.uploadPrivate({ file })

      responses.push(response)
    }

    return responses
  }
}
