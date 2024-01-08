import { IBaseDataResponse } from '@base/BaseResponse';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class BaseHttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const data = exception.getResponse() as IBaseDataResponse;
    return response.status(data.statusCode ?? exception.getStatus()).json({
      code: data.code,
      message: data.message,
      data: data.data,
      error: data.error,
    });
  }
}
