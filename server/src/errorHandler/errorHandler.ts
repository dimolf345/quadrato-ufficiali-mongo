import { Request, Response, NextFunction } from 'express'
import { AppError } from './ErrorClass'
import { sendResponseError } from '../utils/sendResponse'
require('dotenv').config()

const mode = process.env.NODE_ENV?.trim()

export default function errorHandler (err: AppError, req: Request, res: Response, next: NextFunction) {
  if (mode === 'development') {
    console.log(err)
    return sendResponseError(res, {
      status: err.status || 500,
      error: err,
      stack: err.stack
    })
  }
}
