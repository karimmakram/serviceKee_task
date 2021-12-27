import express from 'express'
import { bookRoute } from './web/Routes/bookRoute'
const app = express()
app.use(express.json())
app.use('/book', bookRoute)
app.get('/', (req, res) => {
  res.send('Local Host run....')
})
const PORT = process.env.Port || 5000
app.listen(PORT, () => {
  console.log('App running in port : ', PORT)
})
