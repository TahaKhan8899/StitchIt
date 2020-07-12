import mongoose from 'mongoose'

const shippingSchema = new mongoose.Schema({
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
})

const paymentSchema = new mongoose.Schema({
  paymentMethod: { type: String, required: true },
})

const orderItemSchema = mongoose.Schema({
  name: { type: String, required: true },
  qty: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: String, required: true },
  _id: {
    type: mongoose.Schema.Types,
    ref: 'Product',
    required: true,
  },
})

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types, ref: 'User', required: true },
    orderItems: [orderItemSchema],
    shipping: shippingSchema,
    payment: paymentSchema,
    itemsPrice: { type: Number },
    taxPrice: { type: Number },
    shippingPrice: { type: Number },
    totalPrice: { type: Number },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },
  {
    timestamps: true,
  }
)

const Order = mongoose.model('Order', orderSchema)

export default Order
