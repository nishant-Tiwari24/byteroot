import { Injectable } from '@nestjs/common'
import { ConfigurationService } from '@server/core/configuration'
import { Logger, LoggerService } from '@server/libraries/logger'
import { ReadStream } from 'fs'
import OpenaiSDK from 'openai'
import { ChatCompletionMessageParam } from 'openai/resources'

enum OpenaiModel {
  DEFAULT = 'gpt-3.5-turbo-16k',
  IMAGE = 'dall-e-3',
  AUDIO_TO_TEXT = 'whisper-1',
  TEXT_TO_AUDIO = 'tts-1',
}

@Injectable()
export class Openai {
  private api: OpenaiSDK

  private logger: Logger

  constructor(
    private configurationService: ConfigurationService,
    private loggerService: LoggerService,
  ) {
    this.logger = this.loggerService.create({ name: 'Openai' })

    this.initialize()
  }

  private initialize(): void {
    try {
      const apiKey = this.configurationService.get('SERVER_OPENAI_API_KEY')

      if (!apiKey) {
        this.logger.warning(
          `Set SERVER_OPENAI_API_KEY in your .env to activate OpenAI`,
        )
        return
      }

      this.api = new OpenaiSDK({ apiKey })

      this.logger.success(`Openai is active`)
    } catch (error) {
      this.logger.error(`Openai failed to start`)
    }
  }

  isActive(): boolean {
    if (this.api) {
      return true
    } else {
      return false
    }
  }

  async chat(prompt: string): Promise<string> {
    const messages = this.buildMessages(prompt)

    const response = await this.api.chat.completions.create({
      model: OpenaiModel.DEFAULT,
      messages,
    })

    const content = this.parseResponseContent(response)

    return content
  }

  async generateImage(prompt: string): Promise<string> {
    const response = await this.api.images.generate({
      model: OpenaiModel.IMAGE,
      prompt: prompt,
    })

    const imageUrl = this.parseResponseImage(response)

    return imageUrl
  }

  async fromAudioToText(readStream: ReadStream): Promise<string> {
    const transcription = await this.api.audio.transcriptions.create({
      file: readStream,
      model: OpenaiModel.AUDIO_TO_TEXT,
    })

    return transcription.text
  }

  async fromTextToAudio(text: string): Promise<Buffer> {
    const mp3 = await this.api.audio.speech.create({
      model: OpenaiModel.TEXT_TO_AUDIO,
      voice: 'alloy',
      input: text,
    })

    const buffer = Buffer.from(await mp3.arrayBuffer())

    return buffer
  }

  private buildMessages(content: string): ChatCompletionMessageParam[] {
    return [
      {
        role: 'user',
        content,
      },
    ]
  }

  private parseResponseContent(
    response: OpenaiSDK.Chat.Completions.ChatCompletion,
  ): string {
    return response.choices[0].message.content
  }

  private parseResponseImage(
    response: OpenaiSDK.Images.ImagesResponse,
  ): string {
    return response.data[0].url
  }
}
