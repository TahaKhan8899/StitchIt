import express from 'express'
// import path from 'path'
import config from './config'
import { connectToMongoDB } from './util'
import userRouter from './routes/userRoute'
import productRouter from './routes/productRoute'
import orderRouter from './routes/orderRouter'
import bodyParser from 'body-parser'
import cors from 'cors'
const stripe = require('stripe')(config.STRIPE_SECRET)

connectToMongoDB()

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/orders', orderRouter)

// TODO: Integrate with the payment object that gets created from client
// async function createPaymentIntent() {
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: 1099,
//     currency: 'cad',
//     // Verify your integration in this guide by including this parameter
//     metadata: { integration_check: 'accept_a_payment' },
//   })
//   return paymentIntent
// }

// app.get('/secret', async (req, res) => {
//   const intent = createPaymentIntent().then((int) => {
//     res.send(int.client_secret)
//   })
// })

app.listen(config.PORT, () => {
  console.log(`server started at port: ${config.PORT}`)
})
