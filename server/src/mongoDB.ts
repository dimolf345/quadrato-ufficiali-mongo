import { Mongoose } from 'mongoose'
require('dotenv').config()

const mongoose: Mongoose = require('mongoose')

export async function connectDB (mode: string) {
  mongoose.set('strictQuery', false)
  let dbURI

  switch (mode) {
    case 'development':
      console.log('Connecting to local development database')
      dbURI = process.env.MONGO_LOCAL_DABASE
      break
    case 'test':
      console.log('Connecting to test database')
      dbURI = process.env.MONGO_LOCAL_TEST_DATABASE
      break
    default:
      console.log('Connecting to production database')
      dbURI = process.env.MONGO_CLOUD_DATABASE
  }

  mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready')
  })

  mongoose.connection.on('error', (err) => {
    console.error(err)
  })

  await mongoose.connect(dbURI || 'development')
}

export async function disconnectDB () {
  await mongoose.disconnect()
}
