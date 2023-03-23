import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { AppError } from './ErrorClass'
import { sendResponseError } from '../utils/sendResponse'
import { Error } from 'mongoose'
import { MongoError } from 'mongodb'
require('dotenv').config()

const mode = process.env.NODE_ENV?.trim()

export default function errorHandler (err: AppError, _: Request, res: Response, next: NextFunction) {
  if (mode === 'development') {
    console.log(err)
  }
  const erroreFiltrato = discriminaErrore(err)
  return sendResponseError(res, erroreFiltrato)
}

function discriminaErrore (err: AppError | Error | MongoError | Error.CastError) :AppError {
  if (err instanceof AppError) return err
  if (err instanceof Error.ValidationError) {
    return gesticiErroreCampiNonValidi(err)
  }
  if (err instanceof Error.CastError) {
    return gestisciCastError(err)
  }
  if (err instanceof MongoError) {
    if (err.code === 11000) {
      return gestisciErroreCampoUnico(err)
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
  return new AppError(StatusCodes.BAD_REQUEST, messaggioErrore, 'Campo non unico', err.stack)
}

function gesticiErroreCampiNonValidi (err: Error.ValidationError): AppError {
  let message = 'La validazione dei dati inseriti non è riuscita:\n- '
  const valErrors: string | string[] = Object.values(err.errors).map((field) => field.message)
  message += valErrors.join('\n- ')
  return new AppError(StatusCodes.BAD_REQUEST, message, 'Dati Invalidi', err.stack)
}

function gestisciCastError (err: Error.CastError) {
  const message = `Invalid ${err.path} : ${err.value}`
  return new AppError(StatusCodes.BAD_REQUEST, message, 'Dati invalidi', err.stack)
}
