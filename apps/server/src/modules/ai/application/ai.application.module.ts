import { Module } from '@nestjs/common'
import { HttpModule } from '@server/libraries/http'
import { OpenaiModule } from '@server/libraries/openai/openai.module'
import { UploadModule } from '@server/libraries/upload'
import { AIApplicationException } from './ai.application.exception'
import { AiController } from './ai.controller'

@Module({
  imports: [OpenaiModule, HttpModule, UploadModule],
  controllers: [AiController],
  providers: [AIApplicationException],
})
export class AiApplicationModule {}
