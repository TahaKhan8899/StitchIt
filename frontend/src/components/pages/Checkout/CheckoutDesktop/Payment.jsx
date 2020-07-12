import React, { useState } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { breakPoints, SystemColor } from 'globalConstants'
import { FormButton } from 'components/common/SystemStyledComponents'
import { BodyContainer, Row, Column } from 'components/common/layoutStyling'
import { savePayment } from 'actions/cartActions'
import CheckoutSteps from './CheckoutSteps'
import { useHistory } from 'react-router-dom'

const StyledBodyContainer = styled(BodyContainer)`
  display: flex;
  justify-content: center;
  padding-bottom: 4rem;
`

const FormColumn = styled(Column)`
  align-items: center;
  @media only screen and ${breakPoints.sm_under} {
    width: 86%;
  }
`

const FormTitle = styled.h2`
  margin-bottom: 2rem;
`

const FormContainer = styled.div`
  display: flex;
  max-width: 30rem;
  width: 100%;
  border: 0.1rem #808080 solid;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-top: 3rem;
  background-color: ${SystemColor.uiElements.formBackground};
`

const FormInputColumn = styled(Column)`
  margin-bottom: 2rem;
  input {
    border: 0.1rem #c0c0c0 solid;
    border-radius: 0.5rem;
    padding: 1rem;
  }
`

function Payment(props) {
  const history = useHistory()

  const cart = useSelector((state) => state.cart)
  const { shipping } = cart

  if (!shipping.address) {
    history.push('/checkout/shipping')
  }
  const [paymentMethod, setPaymentMethod] = useState('')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePayment({ paymentMethod }))
    history.push('/checkout/placeOrder')
  }
  return (
    <StyledBodyContainer>
      <Row>
        <Column>
          <CheckoutSteps step1 step2 step3 />
        </Column>
        <FormColumn>
          <FormContainer>
            <Row>
              <Column>
                <FormTitle>Payment</FormTitle>
              </Column>
              <FormInputColumn>
                <Row>
                  <input
                    type="radio"
                    id="address"
                    name="paymentMethod"
                    value="Paypal"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label htmlFor="paymentMethod">Paypal </label>
                </Row>
              </FormInputColumn>
              <FormInputColumn>
                <FormButton onClick={(e) => submitHandler(e)} bgColor="#f0c040" type="submit">
                  Continue
                </FormButton>
              </FormInputColumn>
            </Row>
          </FormContainer>
        </FormColumn>
      </Row>
    </StyledBodyContainer>
  )
}

export default Payment
