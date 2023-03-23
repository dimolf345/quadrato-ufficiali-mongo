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
  const nuovoMovimento = await movimentiSchema.create<Movimento>(req.body) as unknown as Movimento
  if (nuovoMovimento) {
    req.body.responseData = nuovoMovimento
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
    movimenti = await movimentiSchema.find(filtri).limit(limit).sort(sort).skip(skip)
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
