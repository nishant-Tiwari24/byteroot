import { Module } from '@nestjs/common'
import { UploadModule } from '@server/libraries/upload/upload.module'
import { UploadController } from './upload.controller'

@Module({
  imports: [UploadModule],
  controllers: [UploadController],
  providers: [],
})
export class UploadApplicationModule {}
