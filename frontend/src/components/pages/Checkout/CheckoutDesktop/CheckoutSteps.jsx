import React from 'react'
import styled from 'styled-components'

const CheckoutStepsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 40rem;
  padding: 2rem;
  margin-left: auto;
  margin-right: auto;
`

const CheckoutStep = styled.div`
  border-top: ${(props) => (props.active ? '0.3rem #f08000 solid' : '0.3rem #c0c0c0 solid')};
  color: ${(props) => (props.active ? '#f08000' : '#c0c0c0')};
  flex: 1 1;
  padding-top: 1rem;
`

function CheckoutSteps(props) {
  return (
    <CheckoutStepsContainer>
      <CheckoutStep active={props.step1}>Sign In</CheckoutStep>
      <CheckoutStep active={props.step2}>Shipping</CheckoutStep>
      <CheckoutStep active={props.step3}>Payment</CheckoutStep>
      <CheckoutStep active={props.step4}>Place Order</CheckoutStep>
    </CheckoutStepsContainer>
  )
}

export default CheckoutSteps
