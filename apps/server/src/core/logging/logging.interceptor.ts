import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { ContextHelper } from '@server/helpers/context'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { LoggingService } from './logging.service'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private loggingService: LoggingService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = ContextHelper.toRequest(context)

    this.loggingService.logOnStart(request)

    return next.handle().pipe(
      tap(() => {
        this.loggingService.logOnStop(request)
      }),
    )
  }
}
