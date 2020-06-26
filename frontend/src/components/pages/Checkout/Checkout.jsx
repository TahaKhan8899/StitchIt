import React from 'react'
import ShowForSizes from 'components/HOC/ShowForSizes'
import CheckoutDesktop from './CheckoutDesktop'

function Checkout() {
  return (
    <>
      <ShowForSizes showOnlyFor={['xl', 'lg', 'md']}>
        <CheckoutDesktop />
      </ShowForSizes>
      <ShowForSizes showOnlyFor={['sm', 'xs']}>Responsive</ShowForSizes>
    </>
  )
}

export default Checkout
