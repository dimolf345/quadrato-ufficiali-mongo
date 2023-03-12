import express, { Router, Request, Response, NextFunction } from 'express'
import { creaFiltriSortCollezione } from '../../utils/query'

export const ufficialiRouter: Router = express.Router()

ufficialiRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  const { filtri, sort } = creaFiltriSortCollezione(req)
})
