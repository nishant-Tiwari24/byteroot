import { Module } from '@nestjs/common'
import { GoogleService } from './google.service'

@Module({
  providers: [GoogleService],
  exports: [GoogleService],
})
export class GoogleModule {}
