import dotenv from 'dotenv'

dotenv.config()

export const {
    PORT = 8080,
    MONGODB_URI = ''
} = process.env