import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FormButton } from 'components/common/SystemStyledComponents'
import { SystemColor } from 'globalConstants'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, removeFromCart } from 'actions/cartActions'
import { BodyContainer, Row, Column } from 'components/common/layoutStyling'

const CartContainer = styled(BodyContainer)`
  display: flex;
  flex-wrap: wrap;
  padding-top: 2rem;
`
const CartList = styled(Column)`
  flex: 3 1 60rem;
  li {
    list-style-type: none;
  }
  padding-right: 5rem;
`
const CartActions = styled(Column)`
  flex: 1 1 20rem;
  align-items: flex-start;
  background-color: #e8e6e6;
  border-radius: 0.5rem;
  padding: 1rem;
  height: fit-content;
`

const Product = styled.div`
  display: flex;
`

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const CartTopRow = styled(Row)`
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.1rem #808080 solid;
`

const EmptyCart = styled.div`
  margin-top: 2rem;
`

const CartItemRow = styled(Row)`
  justify-content: space-between;
  img {
    max-width: 10rem;
    max-height: 10rem;
  }
  padding-bottom: 1.5rem;
  padding-top: 1.5rem;
  :first-child {
    border-top: 0;
  }
  border-bottom: 0.1rem #808080 solid;
  border-top: 0.1rem #808080 solid;
  margin-bottom: 2rem;
  font-size: 2.3rem;
`

function Cart(props) {
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const dispatch = useDispatch()
  const productId = props.match.params.id
  const queryString = props.location.search

  //   qty is a in the query string, so we need to search for it
  //   ex. "qty=1"
  const qty = queryString ? Number(queryString.split('=')[1]) : 1

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId))
  }
  const handleCheckout = () => {
    props.history.push('/signin?redirect=checkout/shipping')
  }
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, qty, productId])

  return (
    <CartContainer>
      <CartList>
        <Row>
          <Column>
            <CartTopRow>
              <h3>Shopping Cart</h3>
              <div>Price</div>
            </CartTopRow>
            {cartItems.length === 0 ? (
              <EmptyCart>Cart is empty</EmptyCart>
            ) : (
              <Row>
                <Column>
                  {cartItems.map((item, index) => (
                    <CartItemRow key={`product-${index}`}>
                      <Product>
                        <img src={item.image} alt="product-img" />
                        <ProductInfo>
                          <Link to={`/products/${item._id}`}>{item.name}</Link>
                          <div>
                            Quantity:
                            <select
                              value={item.qty}
                              onChange={(e) =>
                                dispatch(addToCart(item._id, parseInt(e.target.value, 10)))
                              }
                            >
                              {[...Array(item.inventoryCount).keys()].map((x, idx) => (
                                <option key={`qty-${idx}`} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))}
                            </select>
                            <button onClick={() => handleRemoveFromCart(item._id)}>Delete</button>
                          </div>
                        </ProductInfo>
                      </Product>
                      <div>${item.price}</div>
                    </CartItemRow>
                  ))}
                </Column>
              </Row>
            )}
          </Column>
        </Row>
      </CartList>
      <CartActions>
        <h3>
          Subtotal ( {cartItems.reduce((a, c) => a + c.qty, 0)} items) : $
          {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
        </h3>
        <FormButton
          bgColor={SystemColor.uiElements.buttonOrange}
          disabled={cartItems.length === 0}
          onClick={() => handleCheckout()}
        >
          Proceed to checkout
        </FormButton>
      </CartActions>
    </CartContainer>
  )
}
export default Cart
