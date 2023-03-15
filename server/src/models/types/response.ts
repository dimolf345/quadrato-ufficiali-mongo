import { StatusCodes } from 'http-status-codes'

type CustomResponse = {
  success: boolean;
  status: StatusCodes;
};

export type SuccessResponse = CustomResponse & {
  data: Object
}

export type ErrorResponse = CustomResponse & {
  error: Object | 'string';
  stack?: any
}
