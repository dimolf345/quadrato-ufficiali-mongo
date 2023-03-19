import { NextFunction, Request, Response } from 'express'
import { sendResponseSuccess } from '../../utils/sendResponse'
import ufficialeSchema from '../../models/schemas/ufficiale.schema'
import { catchAsync } from '../../utils/catchAsync'
import { StatusCodes } from 'http-status-codes'
import { creaFiltriSortCollezione, creaPagine } from '../../utils/query'
import { Ufficiale } from '../../models/types/ufficiale'
import { creaRegExpFiltri } from '../../utils/creaRegexpFiltri'
import { AppError } from '../../errorHandler/ErrorClass'

export const creaNuovoUfficiale = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const nuovoUfficiale = await ufficialeSchema.create(req.body)
  if (nuovoUfficiale) {
    return sendResponseSuccess(res, {
      status: StatusCodes.CREATED,
      data: [nuovoUfficiale]
    })
  }
})

export const cercaUfficiali = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { skip, limit } = creaPagine(req)
  const { filtri, sort } = creaFiltriSortCollezione<Ufficiale>(req)
  let ufficiali
  if (filtri.nome || filtri.cognome) {
    // creaRegExpFiltri trasforma la ricerca da case sensitive a case insensitive
    const filtriRegexp = creaRegExpFiltri<Ufficiale>(filtri, ['nome', 'cognome'])
    ufficiali = await ufficialeSchema.find(filtriRegexp).limit(limit).sort(sort).skip(skip)
  } else {
    ufficiali = await ufficialeSchema.find(filtri).limit(limit).sort(sort).skip(skip)
  }
  return sendResponseSuccess(res, {
    status: StatusCodes.OK,
    data: ufficiali
  })
})

export const cercaUfficialePerId = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const ufficiale = await ufficialeSchema.findById(id)
  if (!ufficiale) {
    throw new AppError(StatusCodes.NOT_FOUND, "L'ufficiale cercato non è presente nel DB!", 'Errore ricerca')
  }
  return sendResponseSuccess(res, {
    status: StatusCodes.OK,
    data: [ufficiale]
  })
})

export const aggiornaUfficialePerId = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const ufficialeAggiornato = await ufficialeSchema.findByIdAndUpdate(id, req.body, {
    new: true
  })
  if (ufficialeAggiornato) {
    return sendResponseSuccess(res, {
      status: StatusCodes.OK,
      data: [ufficialeAggiornato]
    })
  } else {
    throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, "Errore nell'aggiornamento dei dati", 'Aggiornamento non riuscito')
  }
})
