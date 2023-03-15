import { Response } from 'express'
import { ErrorResponse, SuccessResponse } from '../models/types/response'

export function sendResponseError (res: Response, errorObj: Partial<ErrorResponse>) {
  return res.status(errorObj.status || 500).json({
    ...errorObj,
    success: false
  })
}

export function sendResponseSuccess (res: Response, dataObj: Partial<SuccessResponse>) {
  return res.status(dataObj.status || 200).json({
    ...dataObj,
    success: true
  })
}
