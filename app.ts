import express, { json } from 'express'
import { PORT } from './config.js'

const app = express()
app.use(json())
app.disable('x-powered-by')

app.get('/', (req, res) => {
  res.send('<h1>Test</h1>')
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
