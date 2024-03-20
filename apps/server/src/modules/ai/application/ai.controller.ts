import { Body, Controller, Post } from '@nestjs/common'
import { DateHelper } from '@server/helpers/date'
import { FileHelper } from '@server/helpers/file'
import { HttpService } from '@server/libraries/http'
import { OpenaiService } from '@server/libraries/openai'
import { UploadFileType, UploadService } from '@server/libraries/upload'
import { AIApplicationException } from './ai.application.exception'
import {
  AiChatBody,
  AiFromAudioToTextBody,
  AiFromTextToAudioBody,
  AiGenerateImageBody,
} from './ai.dto'

@Controller('/v1/ai')
export class AiController {
  constructor(
    private openaiService: OpenaiService,
    private exception: AIApplicationException,
    private httpService: HttpService,
    private uploadService: UploadService,
  ) {}

  @Post('/chat')
  async chat(@Body() body: AiChatBody) {
    const { prompt } = body

    if (!this.openaiService.isActive()) {
      this.exception.openaiNotActivated()
    }

    try {
      const answer = await this.openaiService.chat(prompt)

      return { answer }
    } catch (error) {
      this.exception.openaiError(error)
    }
  }

  @Post('/image')
  async generateImage(@Body() body: AiGenerateImageBody) {
    const { prompt } = body

    if (!this.openaiService.isActive()) {
      this.exception.openaiNotActivated()
    }

    try {
      const answer = await this.openaiService.generateImage(prompt)

      return { answer }
    } catch (error) {
      this.exception.openaiError(error)
    }
  }

  @Post('/audio-to-text')
  async fromAudioToText(@Body() body: AiFromAudioToTextBody) {
    const { url } = body

    if (!this.openaiService.isActive()) {
      this.exception.openaiNotActivated()
    }

    try {
      const arrayBuffer = await this.httpService.download(url)

      const readstream = await FileHelper.createReadStreamFromArrayBuffer(
        arrayBuffer,
        'audio.wav',
      )

      const answer = await this.openaiService.fromAudioToText(readstream)

      return { answer }
    } catch (error) {
      this.exception.openaiError(error)
    }
  }

  @Post('/text-to-audio')
  async fromTextToAudio(@Body() body: AiFromTextToAudioBody) {
    const { text } = body

    if (!this.openaiService.isActive()) {
      this.exception.openaiNotActivated()
    }

    try {
      const buffer = await this.openaiService.fromTextToAudio(text)

      const now = DateHelper.getNow()

      const filename = `${now.getTime()}.mp3`

      const file = {
        originalname: filename,
        buffer: buffer,
      } as UploadFileType

      const urls = await this.uploadService.uploadPublic(file)

      return { url: urls[0].url }
    } catch (error) {
      this.exception.openaiError(error)
    }
  }
}
