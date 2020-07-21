import express from 'express'
import { isAuth } from '../util'
import Order from '../models/orderModel'
import config from '../config'
const stripe = require('stripe')(config.STRIPE_SECRET)

const router = express.Router()

router.get('/:id', isAuth, async (req, res) => {
  try {
    const orderId = req.params.id
    const order = await Order.findById(orderId)
    res.send(order)
  } catch (error) {
    res.status(404).send('Order Not Found')
  }
})

async function createPaymentIntent(order) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: order.totalPrice * 100,
    currency: 'cad',
    // Verify your integration in this guide by including this parameter
    metadata: { integration_check: 'accept_a_payment' },
  })
  console.log(paymentIntent)
  return paymentIntent
}

router.post('/', isAuth, async (req, res) => {
  try {
    const newOrder = new Order({
      user: req.user._id,
      orderItems: req.body.orderItems,
      shipping: req.body.shipping,
      payment: 10,
      itemsPrice: req.body.itemsPrice,
      taxPrice: req.body.taxPrice,
      shippingPrice: req.body.shippingPrice,
      totalPrice: req.body.totalPrice,
    })
    const newOrderCreated = await newOrder.save()
    res.status(201).send({ message: 'New Order Created', data: newOrderCreated })
  } catch (error) {
    return res.status(500).send({ message: 'Error in Creating an Order', data: error })
  }
})

export default router
