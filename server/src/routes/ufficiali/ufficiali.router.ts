import express, { Router } from 'express'
import { cercaUfficiali, creaNuovoUfficiale } from './ufficiali.controller'

export const ufficialiRouter: Router = express.Router()

ufficialiRouter.get('/', cercaUfficiali)

ufficialiRouter.post('/', creaNuovoUfficiale)
