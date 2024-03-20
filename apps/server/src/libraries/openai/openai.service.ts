import { Injectable } from '@nestjs/common'
import { ReadStream } from 'fs'
import { Openai } from './internal/openai'

@Injectable()
export class OpenaiService {
  constructor(private openai: Openai) {}

  async chat(prompt: string): Promise<string> {
    return this.openai.chat(prompt)
  }

  async generateImage(prompt: string): Promise<string> {
    return this.openai.generateImage(prompt)
  }

  async fromAudioToText(readStream: ReadStream): Promise<string> {
    return this.openai.fromAudioToText(readStream)
  }

  async fromTextToAudio(text: string): Promise<Buffer> {
    return this.openai.fromTextToAudio(text)
  }

  isActive(): boolean {
    return this.openai.isActive()
  }
}
