import express from 'express'
// import path from 'path'
import data from './data'
import config from './config'
import { connectToMongoDB } from './util'
import mongoose from 'mongoose'
import userRouter from './routes/userRoute'
import productRouter from './routes/productRoute'
import bodyParser from 'body-parser'

connectToMongoDB()

const app = express()
app.use(bodyParser.json())

// app.use(express.static(path.join(__dirname, '/../frontend/build')))
// app.get('*', (req, res) => {
//   res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`))
// })

app.use('/api/users', userRouter)
app.use('/api/products', productRouter)

app.listen(config.PORT, () => {
  console.log(`server started at port: ${config.PORT}`)
})
