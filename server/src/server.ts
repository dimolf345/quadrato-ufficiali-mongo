import express, { Express, Request, Response } from 'express'

const app: Express = express()

const PORT = process.env.PORT || 8000

app.get('/', (req: Request, res: Response) => {
  res.send('Tua mamma è una puttana')
})

app.listen(PORT, () => {
  console.log('Server is started on port ', PORT)
})
