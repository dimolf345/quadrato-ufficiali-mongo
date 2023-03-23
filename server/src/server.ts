import http from 'http'
import app from './app'
import { connectDB } from './mongoDB'

require('dotenv').config()

const PORT = process.env.PORT || 8000
const nodeEnv = process.env.NODE_ENV || 'production'

const server = http.createServer(app)

async function startServer () {
  await connectDB(nodeEnv.trim())
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
  })
}

startServer()
