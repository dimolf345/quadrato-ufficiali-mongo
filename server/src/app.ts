import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import path from 'path'

const app: Express = express()

const PORT = process.env.PORT

app.use(cors({
  origin: [`http://localhost:${PORT}`]
}))

app.use(express.static(path.join(__dirname, '..', 'public')))

app.get('/*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

export default app
