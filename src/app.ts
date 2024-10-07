import express, { json } from 'express'
import { PORT } from './config.ts'
import { connectToDatabase } from './database.ts'
import { userRouter } from './routes/user.ts'

const app = express()
app.use(json())
app.disable('x-powered-by')

connectToDatabase()

app.use('/users', userRouter)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
