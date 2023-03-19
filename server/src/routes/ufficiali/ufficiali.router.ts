import express, { Router } from 'express'
import { aggiornaUfficialePerId, cercaUfficialePerId, cercaUfficiali, creaNuovoUfficiale } from './ufficiali.controller'

export const ufficialiRouter: Router = express.Router()

ufficialiRouter.get('/', cercaUfficiali)
ufficialiRouter.post('/', creaNuovoUfficiale)
ufficialiRouter.get('/:id', cercaUfficialePerId)
ufficialiRouter.put('/:id', aggiornaUfficialePerId)
