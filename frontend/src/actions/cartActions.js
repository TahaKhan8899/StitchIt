import {
  CART_LOADING,
  CART_ADD_PRODUCT,
  CART_ERROR,
  CART_REMOVE_PRODUCT,
} from 'constants/cartConstants'
import axios from 'axios'

const addToCart = (productId, qty) => async (dispatch) => {
  try {
    dispatch({ type: CART_LOADING })
    const { data } = await axios.get('/api/products/' + productId)
    dispatch({ type: CART_ADD_PRODUCT, payload: { ...data, qty } })
  } catch (error) {
    dispatch({ type: CART_ERROR, payload: error.message })
  }
}

const removeFromCart = (productId) => async (dispatch) => {
  try {
    dispatch({ type: CART_REMOVE_PRODUCT, payload: { productId } })
  } catch (error) {
    dispatch({ type: CART_ERROR, payload: error.message })
  }
}

export { addToCart, removeFromCart }
