import express, { json } from 'express'
import { PORT } from './config.js'
import { userRouter } from './src/routes/user.ts'

const app = express()
app.use(json())
app.disable('x-powered-by')

app.use('/users', userRouter)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
