import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { FormButton } from 'components/common/SystemStyledComponents'
import { SystemColor, breakPoints } from 'globalConstants'
import { useSelector, useDispatch } from 'react-redux'
import { BodyContainer, Row, Column } from 'components/common/layoutStyling'
import CheckoutSteps from './CheckoutSteps'
import ShowForSizes from 'components/HOC/ShowForSizes'
import { createOrder } from 'actions/orderActions'
import { roundTo } from 'utils/numberUtils'

const PlaceOrderContainer = styled(BodyContainer)`
  display: flex;
  flex-wrap: wrap;
  padding-top: 2rem;
`
const OrderSummarySection = styled(Column)`
  flex: 3 1 60rem;
  padding-right: 2rem;
  @media only screen and ${breakPoints.md} {
    padding-right: 0;
  }
`

const OrderStep = styled(Row)`
  background-color: ${SystemColor.uiElements.formBackground};
  border: 0.1rem #808080 solid;
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin-bottom: 2rem;
  :last-child {
    margin-bottom: 0;
  }
`

const OrderActions = styled(Column)`
  height: fit-content;
  flex: 1 1 20rem;
  align-items: flex-start;
  background-color: ${SystemColor.uiElements.formBackground};
  border: 0.1rem #808080 solid;
  border-radius: 0.5rem;
  padding: 1rem;
  @media only screen and ${breakPoints.md} {
    margin-bottom: 2rem;
  }
`

const Product = styled.div`
  display: flex;
`

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const OrderTopRow = styled(Row)`
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

const SummaryRow = styled(Row)`
  width: 100%;
  margin-bottom: 1rem;
  :last-child {
    font-weight: bold;
    color: #c04000;
  }
`

function PlaceOrder(props) {
  const cart = useSelector((state) => state.cart)
  const createdOrder = useSelector((state) => state.createOrder)
  const { loading, success, error } = createdOrder
  const { cartItems, shipping, payment, order } = cart
  const history = useHistory()

  if (!shipping.address) {
    history.push('/checkout/shipping')
  } else if (!payment.paymentMethod) {
    history.push('/checkout/payment')
  }

  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0)
  const shippingPrice = itemsPrice > 50 ? 0 : 10
  const taxPrice = itemsPrice * 0.13
  console.log('tax: ', taxPrice, ' type: ', typeof taxPrice)
  const totalPrice = itemsPrice + shippingPrice + taxPrice
  console.log(totalPrice)

  const dispatch = useDispatch()

  const handlePlaceOrder = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        shipping,
        payment,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      })
    )
  }
  useEffect(() => {
    const orderId = order && order._id
    if (success) {
      history.push('/order/' + order._id)
    }
  }, [history, success, order])

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <PlaceOrderContainer>
        <ShowForSizes showOnlyFor={['md']}>
          <OrderActions>
            <FormButton
              bgColor={SystemColor.uiElements.buttonOrange}
              onClick={() => handlePlaceOrder()}
            >
              Place Order
            </FormButton>
            <h3>Order Summary</h3>
            <SummaryRow>
              <Column xl="50%" lg="50%" md="50%">
                Item(s):
              </Column>
              <Column xl="50%" lg="50%" md="50%">
                ${roundTo(itemsPrice, 2)}
              </Column>
            </SummaryRow>
            <SummaryRow>
              <Column xl="50%" lg="50%" md="50%">
                Shipping:
              </Column>
              <Column xl="50%" lg="50%" md="50%">
                ${roundTo(shippingPrice, 2)}
              </Column>
            </SummaryRow>
            <SummaryRow>
              <Column xl="50%" lg="50%" md="50%">
                Tax:
              </Column>
              <Column xl="50%" lg="50%" md="50%">
                ${roundTo(taxPrice, 2)}
              </Column>
            </SummaryRow>
            <SummaryRow>
              <Column xl="50%" lg="50%" md="50%">
                Order Total:
              </Column>
              <Column xl="50%" lg="50%" md="50%">
                ${roundTo(totalPrice, 2)}
              </Column>
            </SummaryRow>
          </OrderActions>
        </ShowForSizes>
        <OrderSummarySection>
          <OrderStep>
            <Column>
              <h3>Shipping Address</h3>
              <div>
                {cart.shipping.address}, {cart.shipping.city}, {cart.shipping.province},{' '}
                {cart.shipping.postalCode}, {cart.shipping.country}
              </div>
            </Column>
          </OrderStep>
          <OrderStep>
            <Column>
              <h3>Payment Method</h3>
              <div>{cart.payment.paymentMethod}</div>
            </Column>
          </OrderStep>
          <OrderStep>
            <Column>
              <OrderTopRow>
                <h3>Product</h3>
                <div>Price</div>
              </OrderTopRow>
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
                            <div>Quantity: {item.qty}</div>
                          </ProductInfo>
                        </Product>
                        <div>${item.price}</div>
                      </CartItemRow>
                    ))}
                  </Column>
                </Row>
              )}
            </Column>
          </OrderStep>
        </OrderSummarySection>
        <ShowForSizes showOnlyFor={['xl', 'lg']}>
          <OrderActions>
            <FormButton
              bgColor={SystemColor.uiElements.buttonOrange}
              onClick={() => handlePlaceOrder()}
            >
              Place Order
            </FormButton>
            <h3>Order Summary</h3>
            <SummaryRow>
              <Column xl="50%" lg="50%" md="50%">
                Item(s):
              </Column>
              <Column xl="50%" lg="50%" md="50%">
                ${roundTo(itemsPrice, 2)}
              </Column>
            </SummaryRow>
            <SummaryRow>
              <Column xl="50%" lg="50%" md="50%">
                Shipping:
              </Column>
              <Column xl="50%" lg="50%" md="50%">
                ${roundTo(shippingPrice, 2)}
              </Column>
            </SummaryRow>
            <SummaryRow>
              <Column xl="50%" lg="50%" md="50%">
                Tax:
              </Column>
              <Column xl="50%" lg="50%" md="50%">
                ${roundTo(taxPrice, 2)}
              </Column>
            </SummaryRow>
            <SummaryRow>
              <Column xl="50%" lg="50%" md="50%">
                Order Total:
              </Column>
              <Column xl="50%" lg="50%" md="50%">
                ${roundTo(totalPrice, 2)}
              </Column>
            </SummaryRow>
          </OrderActions>
        </ShowForSizes>
      </PlaceOrderContainer>
    </>
  )
}
export default PlaceOrder
