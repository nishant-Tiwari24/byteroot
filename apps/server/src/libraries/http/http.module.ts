import { HttpModule as HttpModuleNest } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { HttpService } from './http.service'

@Module({
  imports: [HttpModuleNest],
  providers: [HttpService],
  exports: [HttpService],
})
export class HttpModule {}
