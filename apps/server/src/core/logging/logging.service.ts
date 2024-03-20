import { Injectable } from '@nestjs/common'
import { Request } from 'express'
import { RequestHelper } from '@server/helpers/request'
import { Logger, LoggerService } from '@server/libraries/logger'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'

@Injectable()
export class LoggingService {
  private logger: Logger

  constructor(
    private authenticationDomainFacade: AuthenticationDomainFacade,
    private loggerService: LoggerService,
  ) {
    this.logger = this.loggerService.create({ name: 'LoggingInterceptor' })
  }

  logOnStart(request: Request): void {
    const path = RequestHelper.getPath(request)
    const method = RequestHelper.getMethod(request)

    const authenticationPayload =
      this.authenticationDomainFacade.getRequestPayload(request)

    const email = authenticationPayload?.user?.email ?? '???@???.com'
    const name = authenticationPayload?.user?.name ?? '???'

    const data = {
      path,
      authentication: authenticationPayload,
    }

    this.logger.log(`[START] ${name} - ${email} | ${method} ${path}`, data)
  }

  logOnStop(request: Request): void {
    const path = RequestHelper.getPath(request)
    const method = RequestHelper.getMethod(request)

    const authenticationPayload =
      this.authenticationDomainFacade.getRequestPayload(request)

    const email = authenticationPayload?.user?.email ?? '???@???.com'
    const name = authenticationPayload?.user?.name ?? '???'

    this.logger.log(`[STOP] ${name} - ${email} | ${method} ${path}`)
  }
}
