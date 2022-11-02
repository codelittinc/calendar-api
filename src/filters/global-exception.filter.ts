import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { isArray } from 'class-validator';
import { Request, Response } from 'express';
import { getI18nContextFromArgumentsHost } from 'nestjs-i18n';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();
    const statusCode = this.getStatusCode(exception);
    const exceptionMessage = this.getErrorMessage(exception);
    const i18n = getI18nContextFromArgumentsHost(host);

    if (!i18n.lang) {
      response.status(statusCode).json({
        message: exceptionMessage,
        statusCode: statusCode,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    } else {
      const translatedMessage = i18n.t(`exceptions.${exceptionMessage}`);
      const wasMessageTranslated = isArray(translatedMessage);
      const errorCode = wasMessageTranslated ? translatedMessage[0] : null;
      const message = wasMessageTranslated ? translatedMessage[1] : exceptionMessage;

      response.status(statusCode).json({
        errorCode,
        message,
        statusCode: statusCode,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }
  }

  getErrorMessage(exception: unknown): string {
    if (exception instanceof HttpException) {
      if (exception instanceof BadRequestException && isArray(exception['response'].message)) {
        return exception['response'].message[0] as string;
      }

      return exception.message;
    }
  }

  getStatusCode(exception: unknown): number {
    return exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
