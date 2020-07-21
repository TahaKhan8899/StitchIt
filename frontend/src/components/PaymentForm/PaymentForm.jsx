import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import CardSection from 'components/CardSection'
import { FormButton } from 'components/common/SystemStyledComponents'
import { SystemColor } from 'globalConstants'
import axios from 'axios'
import { Actions as OrderActions } from 'constants/orderConstants'
import { LoadingState, ErrorState } from 'components/common/layoutStyling'
import Toast from 'components/Toast'

export default function PaymentForm() {
  const stripe = useStripe()
  const elements = useElements()
  const dispatch = useDispatch()

  const orderPayResults = useSelector((state) => state.orderPay)
  const { loading, order, error } = orderPayResults

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }
    dispatch({ type: OrderActions.ORDER_PAY_LOADING })

    const { data: clientSecret } = await axios.get('/secret')
    console.log(clientSecret)

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'Jenny Rosen',
        },
      },
    })

    if (result.error) {
      dispatch({ type: OrderActions.ORDER_PAY_ERROR, payload: result.error })
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
        console.log('Payment Success!')
        dispatch({ type: OrderActions.ORDER_PAY_SUCCESS, payload: result })
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardSection />
      {loading && <LoadingState>Processing Transaction</LoadingState>}
      {error && <Toast type="error" msg={error} />}
      <FormButton disbaled={!stripe} bgColor={SystemColor.uiElements.buttonOrange}>
        Confirm order
      </FormButton>
    </form>
  )
}
