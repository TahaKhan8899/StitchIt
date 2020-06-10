import {
  PRODUCT_LIST_LOADING,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_ERROR,
} from 'constants/productConstants'
import axios from 'axios'

const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_LOADING })
    const { data } = await axios.get('/api/products')
    console.log('Successfully retrieved product data')
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_ERROR, payload: error })
  }
}

export { listProducts }
