import express, { Router } from 'express'
import { getFondo } from './fondo.controller'

export const fondoRouter: Router = express.Router()

fondoRouter.get('/', getFondo)
