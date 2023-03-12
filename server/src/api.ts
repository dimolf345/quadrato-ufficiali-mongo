import express, { Router } from 'express'

import { ufficialiRouter } from './routes/ufficiali/ufficiali.router'

const api: Router = express.Router()

api.use('/ufficiali', ufficialiRouter)

export default api
