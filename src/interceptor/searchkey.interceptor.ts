import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UppercaseSearchKeyInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { searchKey } = request.query;
    if (searchKey) {
      request.query.searchKey = searchKey.toUpperCase().trim();
    }

    return next.handle().pipe(
      map((data) => {
        return data;
      }),
    );
  }
}
