import express from 'express'
import data from './data'

const app = express()

app.get('/api/products', (req, res) => res.send(data.products))

app.get('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id, 10)
  const product = data.products.find((x) => x._id === productId)
  if (product) {
    res.send(product)
  } else res.status(404).send({ msg: 'Product Not Found' })
})

app.listen(5000, () => {
  console.log('server started at http://localhost:5000')
})