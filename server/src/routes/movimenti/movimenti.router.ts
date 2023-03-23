import express, { Router } from 'express'
import { cercaMovimenti, creaNuovoMovimento } from './movimenti.controller'

export const movimentiRouter: Router = express.Router()

movimentiRouter.get('/', cercaMovimenti)
movimentiRouter.post('/', creaNuovoMovimento)
