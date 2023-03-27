import express, { Router } from 'express'
import { aggiornaMovimentoPerId, cercaMovimenti, creaNuovoMovimento } from './movimenti.controller'
import { aggiornaSaldoFondoMiddleware } from '../fondo/fondo.controller'

export const movimentiRouter: Router = express.Router()

movimentiRouter.get('/', cercaMovimenti)
movimentiRouter.post('/', creaNuovoMovimento, aggiornaSaldoFondoMiddleware)
movimentiRouter.put('/:id', aggiornaMovimentoPerId, aggiornaSaldoFondoMiddleware)
