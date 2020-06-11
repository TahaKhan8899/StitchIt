import {
  PRODUCT_LIST_LOADING,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_ERROR,
  PRODUCT_DETAILS_LOADING,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_ERROR,
} from 'constants/productConstants'

function productListReducer(state = { products: [] }, action) {
  switch (action.type) {
    case PRODUCT_LIST_LOADING:
      return { loading: true }
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, error: false, products: action.payload }
    case PRODUCT_LIST_ERROR:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

function productDetailsReducer(state = { loading: false, error: true }, action) {
  switch (action.type) {
    case PRODUCT_DETAILS_LOADING:
      return { loading: true }
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, error: false, product: action.payload }
    case PRODUCT_DETAILS_ERROR:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export { productListReducer, productDetailsReducer }
