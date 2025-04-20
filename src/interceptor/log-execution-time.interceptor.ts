import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Logger,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class LogExecutionTimeInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LogExecutionTimeInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const contextType = context.getType();
    const handlerOrControllerName =
      contextType === 'http'
        ? context.getClass().name + '.' + context.getHandler().name
        : context.getClass().name;

    this.logger.log(`[${handlerOrControllerName}] > Starting execution`);

    return next.handle().pipe(
      tap(() => this.logEnd(now, handlerOrControllerName)),
      catchError((error) => {
        this.logEnd(now, handlerOrControllerName);
        return throwError(() => error);
      }),
    );
  }

  private logEnd(startTime: number, handlerOrControllerName: string) {
    const ms = Date.now() - startTime;
    this.logger.log(`[${handlerOrControllerName}] < Execution time: ${ms}ms`);
  }
}
