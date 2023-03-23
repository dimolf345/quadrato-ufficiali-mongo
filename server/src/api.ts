import express, { Router } from 'express'

import { ufficialiRouter } from './routes/ufficiali/ufficiali.router'
import { movimentiRouter } from './routes/movimenti/movimenti.router'

const api: Router = express.Router()

api.use('/ufficiali', ufficialiRouter)
api.use('/movimenti', movimentiRouter)

export default api
