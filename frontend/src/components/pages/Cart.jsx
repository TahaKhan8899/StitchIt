import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from 'actions/cartActions'

function Cart(props) {
  const dispatch = useDispatch()
  const productId = props.match.params.id
  const queryString = props.location.search

  //   qty is a in the query string, so we need to search for it
  //   ex. "qty=1"
  const qty = queryString ? Number(queryString.split('=')[1]) : 1

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch])

  return <div>Cart</div>
}
export default Cart
