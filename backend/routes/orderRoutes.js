import express from 'express'
import orderModel from '../models/orderModel'

const router = express.Router()

router.post('/', isAuth, async (req, res) => {
  const newOrder = new orderModel({
    user: req.user._id,
    orderItems: req.body.order,
    shipping: req.body.shipping,
    payment: req.body.payment,
    itemsPrice: req.body.itemsPrice,
    taxPrice: req.body.taxPrice,
    shippingPrice: req.body.shippingPrice,
    totalPrice: req.body.totalPrice,
  })
  const newOrderCreated = await newOrder.save()
  res.status(201).send({ message: 'New Order Created', data: newOrderCreated })
})
