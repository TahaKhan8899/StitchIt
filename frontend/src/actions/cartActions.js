import { CART_LOADING, CART_ADD_PRODUCT, CART_SUCCESS, CART_ERROR } from 'constants/cartConstants'
import axios from 'axios'

const addToCart = (productId, qty) => async (dispatch) => {
  try {
    dispatch({ type: CART_LOADING })
    const { data } = await axios.get('/api/products/' + productId)
    dispatch({ type: CART_ADD_PRODUCT, payload: { ...data, qty } })
  } catch (error) {
    dispatch({ type: CART_ERROR })
  }
}

export { addToCart }
