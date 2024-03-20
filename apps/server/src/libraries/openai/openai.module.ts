import { Module } from '@nestjs/common'
import { Openai } from './internal/openai'
import { OpenaiService } from './openai.service'

@Module({
  providers: [OpenaiService, Openai],
  exports: [OpenaiService],
})
export class OpenaiModule {}
