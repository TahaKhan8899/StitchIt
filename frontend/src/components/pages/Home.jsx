import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getProductList } from 'actions/productActions'
import { BodyContainer } from 'components/common/layoutStyling'

function Home(props) {
  const productList = useSelector((state) => state.productList)
  const { products, loading, error } = productList
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProductList())
  }, [dispatch])

  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <BodyContainer>
      <ul className="products">
        {products.map((product) => (
          <li key={product._id}>
            <div className="product">
              <Link to={'/products/' + product._id}>
                <img className="product-image" src={product.image} alt="product" />
              </Link>
              <div className="product-name">
                <Link to={'/products/' + product._id}>{product.name}</Link>
              </div>
              <div className="product-brand">{product.brand}</div>
              <div className="product-price">${product.price}</div>
              <div className="product-rating">
                {product.ratings} Stars ({product.numReviews})
              </div>
            </div>
          </li>
        ))}
      </ul>
    </BodyContainer>
  )
}
export default Home
