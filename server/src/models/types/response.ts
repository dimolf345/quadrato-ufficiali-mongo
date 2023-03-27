import { StatusCodes } from 'http-status-codes'
import { AppError, ProductionError } from '../../errorHandler/ErrorClass'
import { Movimento } from './movimento'

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

export type SuccessResponseWithBalance = CustomResponse & {
  data: {
    movimento: Movimento,
    nuovoSaldo: number
  }
}
