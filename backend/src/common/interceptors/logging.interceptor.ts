import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const gqlContext = GqlExecutionContext.create(context);
    const info = gqlContext.getInfo();
    const args = gqlContext.getArgs();

    const now = Date.now();
    const operation = info.operation.operation;
    const fieldName = info.fieldName;

    this.logger.log(`${operation.toUpperCase()} ${fieldName} - Started`);
    
    return next.handle().pipe(
      tap((data) => {
        const duration = Date.now() - now;
        this.logger.log(`${operation.toUpperCase()} ${fieldName} - Completed in ${duration}ms`);
      }),
    );
  }
}