import React from 'react'
import { Provider } from 'react-redux'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import store from './store'

const stripePromise = loadStripe(
  'pk_test_51H5E3pAnfC00bDgzQk5FAUZDZfCzlhMBHIyXrHfqRXhVH0C0ngLEshjmOVWyIxyQCUCIQsH92omBPo92ujqUM1n900eQ0dEvzM'
)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
