import {
  CART_LOADING,
  CART_ADD_PRODUCT,
  CART_ERROR,
  CART_REMOVE_PRODUCT,
  CART_SAVE_SHIPPING,
} from 'constants/cartConstants'
import axios from 'axios'
import Cookies from 'js-cookie'

const addToCart = (productId, qty) => async (dispatch, getState) => {
  try {
    dispatch({ type: CART_LOADING })
    const { data } = await axios.get('/api/products/' + productId)
    dispatch({ type: CART_ADD_PRODUCT, payload: { ...data, qty } })
    const {
      cart: { cartItems },
    } = getState()
    Cookies.set('cartItems', JSON.stringify(cartItems))
  } catch (error) {
    dispatch({ type: CART_ERROR, payload: error.message })
  }
}

const removeFromCart = (productId) => async (dispatch, getState) => {
  try {
    dispatch({ type: CART_REMOVE_PRODUCT, payload: { productId } })
    const {
      cart: { cartItems },
    } = getState()
    Cookies.set('cartItems', JSON.stringify(cartItems))
  } catch (error) {
    dispatch({ type: CART_ERROR, payload: error.message })
  }
}

const saveShipping = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING, payload: data })
}

export { addToCart, removeFromCart, saveShipping }
