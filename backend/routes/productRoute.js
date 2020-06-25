import express from 'express'
import Product from '../models/productModel'
import { isAuth, isAdmin } from '../util'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const products = await Product.find({})
    res.send(products)
  } catch (error) {
    res.status(404).send({ message: 'Error in finding products' })
  }
})

router.get('/:id', async (req, res) => {
  const productId = req.params.id
  try {
    const product = await Product.findById(productId)
    res.send(product)
  } catch (error) {
    res.status(404).send({ message: 'Product not found' })
  }
})

router.post('/', isAuth, isAdmin, async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      image: req.body.image,
      brand: req.body.brand,
      category: req.body.category,
      inventoryCount: req.body.inventoryCount,
      description: req.body.description,
    })
    const newProduct = await product.save()
    return res.status(201).send({ message: 'New Product Created', data: newProduct })
  } catch (error) {
    return res.status(500).send({ message: 'Error in Creating a Product' })
  }
})

router.put('/:id', isAuth, isAdmin, async (req, res) => {
  const productId = req.params.id
  try {
    const product = await Product.findById(productId)
    if (product) {
      product.name = req.body.name
      product.price = req.body.price
      product.image = req.body.image
      product.brand = req.body.brand
      product.category = req.body.category
      product.inventoryCount = req.body.inventoryCount
      product.description = req.body.description
      const updatedProduct = await product.save()
      if (updatedProduct) {
        return res.status(200).send({ message: 'Product Updated', data: updatedProduct })
      }
    }
  } catch (error) {
    return res.status(500).send({ message: 'Error in Updating a Product' })
  }
})

router.delete('/:id', isAuth, isAdmin, async (req, res) => {
  try {
    const deletedProduct = await Product.findById(req.params.id)
    await deletedProduct.remove()
    res.send({ message: 'Product Deleted' })
  } catch (error) {
    res.send('Error in Deletion')
  }
})

export default router
