import { Request, Response, NextFunction } from 'express'
import fondoSchema from '../../models/schemas/fondo.schema'
import { AppError } from '../../errorHandler/ErrorClass'
import { sendResponseSuccess } from '../../utils/sendResponse'
import { StatusCodes } from 'http-status-codes'

export async function aggiornaSaldoFondoMiddleware (req: Request, res: Response, next:NextFunction) {
  const { movimento, varFondo, status } = req.body
  const fondo = await fondoSchema.findOne({})
  if (!fondo) {
    next(new AppError(500, 'Non è presente alcun dato sul fondo di quadrato', 'Dati non trovati'))
  } else {
    const nuovoSaldo = await fondo.aggiornaSaldoEMovimenti(varFondo, movimento._id)
    return sendResponseSuccess(res, {
      status,
      data: {
        movimento,
        nuovoSaldo
      }
    })
  }
}

export async function getFondo (req: Request, res: Response, next: NextFunction) {
  const fondo = await fondoSchema.findOne({}).populate({
    path: 'ultimi_movimenti',
    populate: {
      path: 'creato_da',
      select: 'grado cognome nome -_id'
    }
  })
  if (!fondo) {
    next(new AppError(500, 'Non è presente alcun dato sul fondo di quadrato', 'Dati non trovati'))
  } else {
    return sendResponseSuccess(res, {
      status: StatusCodes.OK,
      data: {
        ...fondo.toObject()
      }
    })
  }
}

export async function inizializzaFondo () {
  const fondo = await fondoSchema.findOne()
  if (!fondo) {
    await fondoSchema.create({
      saldo: 0
    })
  }
}
