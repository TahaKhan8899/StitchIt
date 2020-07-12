import express from 'express'
import { isAuth } from '../util'
import Order from '../models/orderModel'

const router = express.Router()

router.post('/', isAuth, async (req, res) => {
  try {
    const newOrder = new Order({
      user: req.user._id,
      orderItems: req.body.orderItems,
      shipping: req.body.shipping,
      payment: req.body.payment,
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
