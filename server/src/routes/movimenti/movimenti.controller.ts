import { NextFunction, Request, Response } from 'express'
import movimentiSchema from '../../models/schemas/movimento.schema'

import { Movimento } from '../../models/types/movimento'
import { catchAsync } from '../../utils/catchAsync'
import { creaFiltriSortCollezione, creaPagine } from '../../utils/query'
import { creaRegExpFiltri } from '../../utils/creaRegexpFiltri'
import { sendResponseSuccess } from '../../utils/sendResponse'
import { StatusCodes } from 'http-status-codes'
import { AppError } from '../../errorHandler/ErrorClass'

export const creaNuovoMovimento = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const nuovoMovimento = await movimentiSchema.create({
    ...req.body
  })
  if (nuovoMovimento) {
    req.body.status = StatusCodes.CREATED
    req.body.movimento = nuovoMovimento
    req.body.varFondo = nuovoMovimento.importo
    next()
  }
})

export const cercaMovimenti = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { skip, limit } = creaPagine(req)
  const { filtri, sort } = creaFiltriSortCollezione<Movimento>(req)
  let movimenti
  if (filtri.descrizione) {
    const filtriRegexp = creaRegExpFiltri<Movimento>(filtri, ['descrizione'])
    movimenti = await movimentiSchema.find(filtriRegexp).limit(limit).sort(sort).skip(skip)
  } else {
    movimenti = await movimentiSchema.find(filtri).limit(limit).sort(sort).skip(skip).populate('creato_da', 'grado cognome nome -_id')
  }
  return sendResponseSuccess(res, {
    status: StatusCodes.OK,
    data: movimenti
  })
})

export const cercaMovimentoperId = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const movimento = await movimentiSchema.findById(id)
  if (!movimento) {
    throw new AppError(StatusCodes.NOT_FOUND, "Il movimento cercato non è presente all'interno del DB", 'Errore ricerca')
  }
  return sendResponseSuccess(res, {
    status: StatusCodes.OK,
    data: movimento
  })
})

export const aggiornaMovimentoPerId = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const _id = req.params.id
  const vecchioMovimento = await movimentiSchema.findById(_id)
  if (!vecchioMovimento) {
    throw new AppError(400, 'Il movimento cercato non è presente nel database', 'Documento non trovato')
  }
  const nuovoMovimento = await movimentiSchema.findByIdAndUpdate(_id, req.body, {
    new: true
  })
  if (req.body.importo && req.body.importo !== vecchioMovimento?.importo) {
    req.body.varFondo = nuovoMovimento!.importo - vecchioMovimento.importo!
  }
  req.body.status = StatusCodes.OK
  req.body.movimento = nuovoMovimento
  next()
})
