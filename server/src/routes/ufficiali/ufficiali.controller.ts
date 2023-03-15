import { NextFunction, Request, Response } from 'express'
import { sendResponseSuccess } from '../../utils/sendResponse'
import Ufficiale from '../../models/schemas/ufficiale.schema'
import { catchAsync } from '../../utils/catchAsync'
import { StatusCodes } from 'http-status-codes'

export const creaNuovoUfficiale = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const nuovoUfficiale = await Ufficiale.create(req.body)
  if (nuovoUfficiale) {
    return sendResponseSuccess(res, {
      status: StatusCodes.CREATED,
      data: nuovoUfficiale
    })
  }
})

export const cercaUfficiali = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  console.log('Porca madonna')
})
