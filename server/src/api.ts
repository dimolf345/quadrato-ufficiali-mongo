import express, { Router } from 'express'

import { ufficialiRouter } from './routes/ufficiali/ufficiali.router'
import { movimentiRouter } from './routes/movimenti/movimenti.router'
import { fondoRouter } from './routes/fondo/fondo.router'

const api: Router = express.Router()

api.use('/ufficiali', ufficialiRouter)
api.use('/movimenti', movimentiRouter)
api.use('/fondo', fondoRouter)

export default api
