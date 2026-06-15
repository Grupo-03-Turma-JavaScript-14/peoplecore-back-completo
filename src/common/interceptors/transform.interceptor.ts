import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ApiResponse<T> {
  data: T;
  message: string;
  statusCode: number;
  timestamp: string;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
    const res = context.switchToHttp().getResponse();
    const statusCode = res.statusCode;

    return next.handle().pipe(
      map((data) => {
        return {
          data,
          message: 'success',
          statusCode,
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }
}