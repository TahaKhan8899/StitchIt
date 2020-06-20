import express from 'express'
// import path from 'path'
import data from './data'
import config from './config'
import { connectToMongoDB } from './util'
import mongoose from 'mongoose'
import userRouter from './routes/userRoute'
import bodyParser from 'body-parser'

connectToMongoDB()

const app = express()
app.use(bodyParser.json())

// app.use(express.static(path.join(__dirname, '/../frontend/build')))
// app.get('*', (req, res) => {
//   res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`))
// })

app.use('/api/users', userRouter)

app.get('/api/products', (req, res) => res.send(data.products))

app.get('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id, 10)
  const product = data.products.find((x) => x._id === productId)
  if (product) {
    res.send(product)
  } else res.status(404).send({ msg: 'Product Not Found' })
})

app.listen(config.PORT, () => {
  console.log(`server started at port: ${config.PORT}`)
})
