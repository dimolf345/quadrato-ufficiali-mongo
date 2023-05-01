import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import path from 'path'
import apiv1 from './api'
import errorHandler from './errorHandler/errorHandler'
require('dotenv').config()

const app: Express = express()

const PORT = process.env.PORT

app.use(
  cors({
    origin: ['http://localhost:4200']
  })
)
app.use(express.json())
app.use('/api/v1', apiv1)

app.use(errorHandler)
app.use(express.static(path.join(__dirname, '..', 'public')))

app.get('/*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

export default app
