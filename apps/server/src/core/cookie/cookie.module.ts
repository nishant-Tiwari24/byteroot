import { Global, Module } from '@nestjs/common'
import { CookieService } from './cookie.service'

@Global()
@Module({
  imports: [],
  providers: [CookieService],
  exports: [CookieService],
})
export class CookieModule {}
