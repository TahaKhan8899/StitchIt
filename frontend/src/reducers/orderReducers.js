import {
  CREATE_ORDER_LOADING,
  CREATE_ORDER_ERROR,
  CREATE_ORDER_SUCCESS,
} from 'constants/orderConstants'

function createOrderReducer(state = {}, action) {
  switch (action.value) {
    case CREATE_ORDER_LOADING:
      return { ...state, loading: true }
    case CREATE_ORDER_ERROR:
      return { loading: false, error: action.payload }
    case CREATE_ORDER_SUCCESS:
      return { loading: false, order: action.payload }
    default:
      return state
  }
}

export { createOrderReducer }
