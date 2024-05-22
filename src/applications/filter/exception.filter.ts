import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>();
        const status = exception.getStatus();
        const response = exception.getResponse() as { statusCode: number; message: string | string[]; error: string };
        const message = Array.isArray(response.message) ? response.message[0] : response.message;

        res
            .status(status)
            .json({
                statusCode: status,
                success: false,
                message: message || response,
                data: {}
            });
    }
}
