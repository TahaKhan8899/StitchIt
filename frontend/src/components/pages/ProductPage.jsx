import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { BodyContainer, Row, Column } from 'components/common/layoutStyling'
import { useSelector, useDispatch } from 'react-redux'
import { getProductDetails } from 'actions/productActions'

const ProductSection = styled(Row)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  padding: 1rem;
`
const BackButton = styled.div`
  padding: 1rem;
`

const ProductImage = styled(Column)`
  flex: 2 1 60rem;
  img {
    max-width: 60rem;
    width: 100%;
  }
`
const ProductInfo = styled(Column)`
  flex: 1 1 30rem;
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    margin-bottom: 1rem;
  }
  h4 {
    margin-top: 0;
  }
`
const AddToCart = styled(Column)`
  flex: 1 1 25rem;
  border: 0.1rem #808080 solid;
  border-radius: 0.5rem;
  background-color: #f8f8f8;
  padding: 1rem;
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    margin-bottom: 1rem;
  }
  li:last-child {
    display: flex;
    flex-direction: column;
    button {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      border: 0.1rem #808080 solid;
      border-radius: 0.5rem;
      cursor: pointer;
      background-color: #f0c040;
    }
    button:hover {
      border: 0.1rem #404040 solid;
    }
  }
`

function ProductPage(props) {
  const productDetails = useSelector((state) => state.productDetails)
  const { product, loading, error } = productDetails
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('get details')
    dispatch(getProductDetails(props.match.params.id))
  }, [dispatch, props.match.params.id])

  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <BodyContainer>
      <Row>
        <BackButton>
          <Link to="/">Back to result</Link>
        </BackButton>
      </Row>
      <ProductSection>
        <ProductImage>
          <img src={product.image} alt="product" />
        </ProductImage>
        <ProductInfo>
          <ul>
            <li>
              <h4>{product.name}</h4>
            </li>
            <li>
              {product.rating} Starts ({product.numReviews} Reviews)
            </li>
            <li>
              <b>${product.price}</b>
            </li>
            <li>
              Description: <b>{product.desc}</b>
            </li>
          </ul>
        </ProductInfo>
        <AddToCart>
          <ul>
            <li>Price: {product.price}</li>
            <li>Status: {product.status}</li>
            <li>
              Quantity:{' '}
              <select name="" id="">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </li>
            <li>
              <button>Add to Cart</button>
            </li>
          </ul>
        </AddToCart>
      </ProductSection>
    </BodyContainer>
  )
}
export default ProductPage
