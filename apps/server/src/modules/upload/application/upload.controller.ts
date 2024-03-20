import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { UploadFileType, UploadService } from '@server/libraries/upload'

@Controller('/v1/upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Post('/public')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: UploadFileType) {
    const responses = await this.uploadService.uploadPublic(file)

    const url = responses[0].url

    return { url }
  }
}
