import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import path from 'path'

import apiv1 from './api'

const app: Express = express()

const PORT = process.env.PORT

app.use(cors({
  origin: [`http://localhost:${PORT}`]
}))
app.use(express.json())
app.use('/api/v1', apiv1)

app.use(express.static(path.join(__dirname, '..', 'public')))

app.get('/*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

export default app
