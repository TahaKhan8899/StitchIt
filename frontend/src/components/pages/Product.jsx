import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FormButton } from 'components/common/SystemStyledComponents'
import { SystemColor } from 'globalConstants'
import {
  BodyContainer,
  Row,
  Column,
  LoadingState,
  ErrorState,
} from 'components/common/layoutStyling'
import Toast from 'components/Toast'
import { useSelector, useDispatch } from 'react-redux'
import { getProductDetails } from 'actions/productActions'
import { useState } from 'react'

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
  }
`

function Product(props) {
  const [qty, setQty] = useState(1)
  const productDetails = useSelector((state) => state.productDetails)
  const { product, loading, error } = productDetails
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProductDetails(props.match.params.id))
  }, [dispatch, props.match.params.id])

  const handleAddToCart = () => {
    props.history.push('/cart/' + props.match.params.id + '?qty=' + qty)
  }

  return loading ? (
    <BodyContainer>
      <LoadingState>Loading...</LoadingState>
    </BodyContainer>
  ) : error ? (
    <Toast type="error" msg={error} />
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
            <li>Status: {product.inventoryCount > 0 ? 'In Stock' : 'Out of Stock'}</li>
            <li>
              Quantity:{' '}
              <select
                value={qty}
                onChange={(e) => {
                  setQty(e.target.value)
                }}
              >
                {[...Array(product.inventoryCount).keys()].map((x, idx) => (
                  <option key={`option-${idx}`} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>
            </li>
            <li>
              {product.inventoryCount > 0 && (
                <FormButton bgColor={SystemColor.uiElements.buttonOrange} onClick={handleAddToCart}>
                  Add to Cart
                </FormButton>
              )}
            </li>
          </ul>
        </AddToCart>
      </ProductSection>
    </BodyContainer>
  )
}
export default Product
