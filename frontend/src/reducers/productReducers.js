import {
  PRODUCT_LIST_LOADING,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_ERROR,
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

export { productListReducer }
