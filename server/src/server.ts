import http from 'http'
import app from './app'
import { connectDB } from './mongoDB'
import { inizializzaFondo } from './routes/fondo/fondo.controller'

require('dotenv').config()

const PORT = process.env.PORT || 8000
const nodeEnv = process.env.NODE_ENV || 'production'

const server = http.createServer(app)

async function startServer () {
  await connectDB(nodeEnv.trim())
  server.listen(PORT, async () => {
    console.log(`Listening on port ${PORT}`)
    inizializzaFondo()
  })
}

startServer()
