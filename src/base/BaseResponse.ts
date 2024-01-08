import { RESPONSE_CODE_DEFAULT } from '@constants/responseCode.constant';
import { RESPONSE_MESSAGE_DEFAULT } from '@constants/responseMessage.constant';
import {
  BadRequestException,
  HttpStatus,
  InternalServerErrorException,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';

export interface IBaseDataResponse {
  statusCode?: number;
  data?: any;
  message?: string;
  error?: any;
  code?: string;
}

export const responseSuccess = (data: IBaseDataResponse) => {
  return {
    data: data.data ?? null,
    message: data.message ?? RESPONSE_MESSAGE_DEFAULT.QUERY_SUCCESS,
    error: data.error ?? null,
    code: data.code ?? RESPONSE_CODE_DEFAULT.SUCCESS,
  };
};

export const responseErrorBadRequest = (data: IBaseDataResponse) => {
  throw new BadRequestException({
    data: data.data ?? null,
    message: data.message ?? RESPONSE_MESSAGE_DEFAULT.ERROR_INVALID,
    error: data.error ?? null,
    code: data.code ?? RESPONSE_CODE_DEFAULT.ERROR_BAD_REQUEST,
  });
};

export const responseErrorUnauthorized = (data: IBaseDataResponse) => {
  throw new UnauthorizedException({
    data: data.data ?? null,
    message: data.message ?? RESPONSE_MESSAGE_DEFAULT.ERROR_UNAUTHORIZED,
    error: data.error ?? null,
    code: data.code ?? RESPONSE_CODE_DEFAULT.ERROR_UNAUTHORIZED,
  });
};

export const responseMaintenance = (data: IBaseDataResponse) => {
  throw new ServiceUnavailableException({
    data: data.data ?? null,
    message: data.message ?? RESPONSE_MESSAGE_DEFAULT.MAINTENANCE,
    error: data.error ?? null,
    code: data.code ?? RESPONSE_CODE_DEFAULT.MAINTENANCE,
  });
};

export const responseError = (data: IBaseDataResponse) => {
  throw new InternalServerErrorException({
    statusCode: data.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR,
    data: data.data ?? null,
    message: data.message ?? RESPONSE_MESSAGE_DEFAULT.ERROR_UNAUTHORIZED,
    error: data.error ?? null,
    code: data.code ?? RESPONSE_CODE_DEFAULT.ERROR_UNAUTHORIZED,
  });
};

export const responseErrorValidate = (data: ValidationError[]) => {
  const errors = {};
  data.map(
    (error) =>
      (errors[error.property] =
        error.constraints[Object.keys(error.constraints)[0]]),
  );
  throw new BadRequestException({
    data: null,
    message: RESPONSE_MESSAGE_DEFAULT.ERROR_INVALID,
    error: errors,
    code: RESPONSE_CODE_DEFAULT.ERROR_INVALID,
  });
};
