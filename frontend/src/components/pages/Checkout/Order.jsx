import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { SystemColor, breakPoints } from 'globalConstants'
import { useSelector, useDispatch } from 'react-redux'
import {
  BodyContainer,
  Row,
  Column,
  LoadingState,
  ErrorState,
} from 'components/common/layoutStyling'
import ShowForSizes from 'components/HOC/ShowForSizes'
import { getOrderDetails } from 'actions/orderActions'
import { roundTo } from 'utils/numberUtils'
import { FormButton } from 'components/common/SystemStyledComponents'
import PaymentForm from 'components/PaymentForm'

const PlaceOrderContainer = styled(BodyContainer)`
  display: flex;
  flex-wrap: wrap;
  padding-top: 2rem !important;
  padding-bottom: 4rem;
`
const OrderSummarySection = styled(Column)`
  flex: 1 1 60rem;
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

const OrderItemRow = styled(Row)`
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

const PaymentFormContainer = styled.div`
  width: 100%;
`

function Order() {
  const { orderId } = useParams()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getOrderDetails(orderId))
  }, [dispatch, orderId])

  const orderDetails = useSelector((state) => state.orderDetails)
  const { loading, order, error } = orderDetails

  const payHandler = () => {}

  return loading ? (
    <BodyContainer>
      <LoadingState>Loading...</LoadingState>
    </BodyContainer>
  ) : error ? (
    <BodyContainer>
      <ErrorState>{error}</ErrorState>
    </BodyContainer>
  ) : (
    <>
      <PlaceOrderContainer>
        <ShowForSizes showOnlyFor={['md']}>
          <OrderActions>
            <FormButton bgColor={SystemColor.uiElements.buttonOrange} onClick={payHandler}>
              Pay Now
            </FormButton>
            <h3>Order Summary</h3>
            <SummaryRow>
              <Column xl="50%" lg="50%" md="50%">
                Item(s):
              </Column>
              <Column xl="50%" lg="50%" md="50%">
                ${roundTo(order.itemsPrice, 2)}
              </Column>
            </SummaryRow>
            <SummaryRow>
              <Column xl="50%" lg="50%" md="50%">
                Shipping:
              </Column>
              <Column xl="50%" lg="50%" md="50%">
                ${roundTo(order.shippingPrice, 2)}
              </Column>
            </SummaryRow>
            <SummaryRow>
              <Column xl="50%" lg="50%" md="50%">
                Tax:
              </Column>
              <Column xl="50%" lg="50%" md="50%">
                ${roundTo(order.taxPrice, 2)}
              </Column>
            </SummaryRow>
            <SummaryRow>
              <Column xl="50%" lg="50%" md="50%">
                Order Total:
              </Column>
              <Column xl="50%" lg="50%" md="50%">
                ${roundTo(order.totalPrice, 2)}
              </Column>
            </SummaryRow>
          </OrderActions>
        </ShowForSizes>
        <OrderSummarySection>
          <OrderStep>
            <Column>
              <h3>Shipping Address</h3>
              <div>
                {order.shipping.address}, {order.shipping.city}, {order.shipping.province},{' '}
                {order.shipping.postalCode}, {order.shipping.country}
              </div>
              <div>
                <h3>
                  {order.isDelivered ? 'Delivered at ' + order.deliveredAt : 'Not Delivered.'}
                </h3>
              </div>
            </Column>
          </OrderStep>
          <OrderStep>
            <Column>
              <h3>Payment Method</h3>
              <div>{order.payment.paymentMethod}</div>
              <h3>
                <div>{order.isPaid ? 'Paid at ' + order.paidAt : 'Not Paid.'}</div>
              </h3>
            </Column>
          </OrderStep>
          <OrderStep>
            <Column>
              <OrderTopRow>
                <h3>Product</h3>
                <div>Price</div>
              </OrderTopRow>
              {order.orderItems.length === 0 ? (
                <EmptyCart>Order is empty</EmptyCart>
              ) : (
                <Row>
                  <Column>
                    {order.orderItems.map((item, index) => (
                      <OrderItemRow key={`product-${index}`}>
                        <Product>
                          <img src={item.image} alt="product-img" />
                          <ProductInfo>
                            <Link to={`/products/${item._id}`}>{item.name}</Link>
                            <div>Quantity: {item.qty}</div>
                          </ProductInfo>
                        </Product>
                        <div>${item.price}</div>
                      </OrderItemRow>
                    ))}
                  </Column>
                </Row>
              )}
            </Column>
          </OrderStep>
        </OrderSummarySection>
        <ShowForSizes showOnlyFor={['xl', 'lg']}>
          <OrderActions>
            {/* <FormButton bgColor={SystemColor.uiElements.buttonOrange} onClick={() => {}}>
              Pay Now
            </FormButton> */}
            <PaymentFormContainer>
              <PaymentForm />
            </PaymentFormContainer>
            <h3>Order Summary</h3>
            <SummaryRow>
              <Column xl="50%" lg="50%" md="50%">
                Item(s):
              </Column>
              <Column xl="50%" lg="50%" md="50%">
                ${roundTo(order.itemsPrice, 2)}
              </Column>
            </SummaryRow>
            <SummaryRow>
              <Column xl="50%" lg="50%" md="50%">
                Shipping:
              </Column>
              <Column xl="50%" lg="50%" md="50%">
                ${roundTo(order.shippingPrice, 2)}
              </Column>
            </SummaryRow>
            <SummaryRow>
              <Column xl="50%" lg="50%" md="50%">
                Tax:
              </Column>
              <Column xl="50%" lg="50%" md="50%">
                ${roundTo(order.taxPrice, 2)}
              </Column>
            </SummaryRow>
            <SummaryRow>
              <Column xl="50%" lg="50%" md="50%">
                Order Total:
              </Column>
              <Column xl="50%" lg="50%" md="50%">
                ${roundTo(order.totalPrice, 2)}
              </Column>
            </SummaryRow>
          </OrderActions>
        </ShowForSizes>
      </PlaceOrderContainer>
    </>
  )
}
export default Order
