import React from 'react'
import { useParams } from 'react-router-dom'
import Shipping from './Shipping'
import Payment from './Payment'
import PlaceOrder from './PlaceOrder'

function getStep(stepName) {
  if (stepName === 'shipping') {
    return Shipping
  }
  if (stepName === 'payment') {
    return Payment
  }
  if (stepName === 'placeOrder') {
    return PlaceOrder
  }
  return Shipping
}

function CheckoutDesktop(props) {
  const { step } = useParams()
  const activeStep = step || 'shipping'
  const StepComponent = getStep(activeStep)
  return <StepComponent />
}

export default CheckoutDesktop
