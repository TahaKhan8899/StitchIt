import React from 'react'
import { useParams } from 'react-router-dom'
import Shipping from './Shipping'

function getStep(stepName) {
  if (stepName === 'shipping') {
    return Shipping
  }
}

function CheckoutDesktop(props) {
  const { step } = useParams()
  const activeStep = step || 'shipping'
  const StepComponent = getStep(activeStep)
  return <StepComponent />
}

export default CheckoutDesktop
