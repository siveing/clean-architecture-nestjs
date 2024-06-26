
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ApplicationInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next
            .handle()
            .pipe(
                map((data) => {
                    return {
                        success: true,
                        statusCode: 200,
                        message: data.message || "Successfully",
                        data: data || {},
                    }
                }),
            );
    }
}