import { Mongoose } from 'mongoose'
require('dotenv').config()

const mongoose: Mongoose = require('mongoose')

async function connectDB (mode: string) {
  mongoose.set('strictQuery', false)
  const dbURI = mode.trim() === 'development' ? process.env.MONGO_LOCAL_DATABASE : process.env.MONGO_CLOUD_DATABASE

  mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready')
  })

  mongoose.connection.on('error', (err) => {
    console.error(err)
  })

  await mongoose.connect(dbURI || 'development')
}

export default connectDB
