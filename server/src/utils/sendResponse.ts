import { Response } from 'express'
import { SuccessResponse } from '../models/types/response'
import { AppError, ProductionError } from '../errorHandler/ErrorClass'

export function sendResponseError (res: Response, errorObj: AppError | ProductionError) {
  return res.status(errorObj.status || 500).json({
    error: {
      ...errorObj,
      status: undefined
    },
    status: errorObj.status,
    success: false
  })
}

export function sendResponseSuccess<T> (res: Response, dataObj: Partial<SuccessResponse<T>>) {
  return res.status(dataObj.status || 200).json({
    ...dataObj,
    success: true
  })
}
