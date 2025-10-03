import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

@Catch(HttpException)
export class GraphqlExceptionFilter implements GqlExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    
    const status = exception.getStatus();
    const response = exception.getResponse();
    
    let message = exception.message;
    let extensions: any = {
      code: status,
      timestamp: new Date().toISOString(),
    };

    if (typeof response === 'object' && response !== null) {
      message = (response as any).message || message;
      extensions = { ...extensions, ...response };
    }

    return new GraphQLError(message, {
      extensions,
    });
  }
}