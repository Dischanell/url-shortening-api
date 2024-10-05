import { connect } from 'mongoose'
import { MONGODB_URI } from './config.ts'

export async function connectToDatabase(){
  try {
    if (!MONGODB_URI) throw new Error('MONGODB_URI environment variable is not defined')

    await connect(MONGODB_URI)
    console.log('Connected to MongoDB')
  } catch (e) {
      console.error(`Error connecting to MongoDB: ${e}`)
      throw e
  }
}