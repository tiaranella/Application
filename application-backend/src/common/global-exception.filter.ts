import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, } from '@nestjs/common';
import { error } from 'console';
import { Request, Response } from 'express';
import path from 'path';
import { timestamp } from 'rxjs';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        const message = exception instanceof HttpException ? exception.getResponse() : { message: 'Internal server error' };

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            error: message,
        });
    }
}