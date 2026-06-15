import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    const status = exception.getStatus();

    const response = exception.getResponse();

    let message: any = exception.message;

    if (typeof response === 'object' && response !== null) {
      const r = response as any;

      // Nest padrão: { statusCode, message, error }
      message = r.message ?? r.error ?? exception.message;
    } else if (typeof response === 'string') {
      message = response;
    }

    return res.status(status).json({
      statusCode: status,
      message,
      error: HttpStatus[status] ?? 'Error',
      path: req.url,
      timestamp: new Date().toISOString(),
    });
  }
}