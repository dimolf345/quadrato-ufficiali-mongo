import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { AppError } from './ErrorClass'
import { sendResponseError } from '../utils/sendResponse'
import { Error } from 'mongoose'
import { MongoError } from 'mongodb'
require('dotenv').config()

const mode = process.env.NODE_ENV?.trim()

export default function errorHandler (err: AppError, _: Request, res: Response, next: NextFunction) {
  const erroreFiltrato = discriminaErrore(err)
  if (mode === 'development') {
    return sendResponseError(res, erroreFiltrato)
  }
}

function discriminaErrore (err: AppError | Error | MongoError) :AppError {
  if (err instanceof AppError) return err
  if (err instanceof MongoError) {
    if (err.code === 11000) {
      const errore = gestisciErroreCampoUnico(err)
      return errore
    }
  }
  return new AppError(500, 'Porca la madonna')
}

function gestisciErroreCampoUnico (err: any): AppError {
  const fields: string[] = []
  const values: any[] = []
  Object.entries(err.keyValue).forEach((el) => {
    fields.push(el[0])
    values.push(el[1])
  })
  const messaggioErrore = `Errore! I campo/i ${fields.join(', ')}, che contiente/contengono il/i valore/i ${values.join(', ')}, deve/devono essere univoco/i.`
  return {
    name: 'Errore chiave duplicata',
    status: StatusCodes.BAD_REQUEST,
    message: messaggioErrore
  }
}
