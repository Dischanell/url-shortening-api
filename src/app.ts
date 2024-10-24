import express, { json } from 'express'
import { PORT } from './config.ts'
import { connectToDatabase } from './database.ts'
import { router } from './routes/routes.ts'
import cookieParser from 'cookie-parser'

const app = express()
app.use(json())
app.use(cookieParser())
app.disable('x-powered-by')

connectToDatabase()

app.use('/', router)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
