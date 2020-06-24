import {
  PRODUCT_LIST_LOADING,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_ERROR,
  PRODUCT_DETAILS_LOADING,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_ERROR,
  CREATE_PRODUCT_LOADING,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
  DELETE_PRODUCT_LOADING,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERROR,
} from 'constants/productConstants'
import { selectLoggedInUserState } from 'selectors/user'
import axios from 'axios'

const getProductList = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_LOADING })
    const { data } = await axios.get('/api/products')
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_ERROR, payload: error.message })
  }
}

const getProductDetails = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_LOADING })
    const { data } = await axios.get('/api/products/' + productId)
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: PRODUCT_DETAILS_ERROR, payload: error.message })
  }
}

const deleteProduct = (productId) => async (dispatch, useSelector) => {
  try {
    const userInfo = useSelector(selectLoggedInUserState)
    dispatch({ type: DELETE_PRODUCT_LOADING })
    const { data } = await axios.delete('/api/products/' + productId, {
      headers: { Authorization: 'Bearer ' + userInfo.token },
    })
    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: DELETE_PRODUCT_ERROR, payload: error.message })
  }
}

const createProduct = (product) => async (dispatch, useSelector) => {
  try {
    dispatch({ type: CREATE_PRODUCT_LOADING })
    const userInfo = useSelector(selectLoggedInUserState)

    if (!product.id) {
      const { data } = await axios.post('/api/products/', product, {
        headers: { Authorization: 'Bearer ' + userInfo.token },
      })
      dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data })
    } else {
      const { data } = await axios.put('/api/products/' + product.id, product, {
        headers: { Authorization: 'Bearer ' + userInfo.token },
      })
      dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data })
    }
  } catch (error) {
    dispatch({ type: CREATE_PRODUCT_ERROR, payload: error.message })
  }
}

export { getProductList, getProductDetails, createProduct, deleteProduct }
