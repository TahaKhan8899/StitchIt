import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, default: 0, required: true },
  image: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  inventoryCount: { type: Number, default: 0, required: true },
  description: { type: String, required: true },
})

const Product = mongoose.model('Product', productSchema)

export default Product
