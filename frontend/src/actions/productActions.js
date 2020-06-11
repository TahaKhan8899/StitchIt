import {
  PRODUCT_LIST_LOADING,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_ERROR,
  PRODUCT_DETAILS_LOADING,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_ERROR,
} from 'constants/productConstants'
import axios from 'axios'

const getProductList = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_LOADING })
    const { data } = await axios.get('/api/products')
    console.log('Successfully retrieved all product data')
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_ERROR, payload: error.message })
  }
}

const getProductDetails = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_LOADING, payload: productId })
    const { data } = await axios.get('/api/products/' + productId)
    console.log(data)
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: PRODUCT_DETAILS_ERROR, payload: error.message })
  }
}

export { getProductList, getProductDetails }
