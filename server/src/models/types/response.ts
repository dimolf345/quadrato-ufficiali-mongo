import { StatusCodes } from 'http-status-codes'
import { AppError, ProductionError } from '../../errorHandler/ErrorClass'

type CustomResponse = {
  success: boolean;
  status: StatusCodes;
};

export type SuccessResponse<T> = CustomResponse & {
  data: Array<T> | T
}

export type ErrorResponse = CustomResponse & {
  error: Partial<AppError | ProductionError>;
}
