import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { LogExecutionTimeInterceptor } from 'src/interceptor/log-execution-time.interceptor';

export function LogExecutionTime() {
  return applyDecorators(UseInterceptors(LogExecutionTimeInterceptor));
}
