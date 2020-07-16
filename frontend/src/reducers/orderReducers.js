import { Actions as OrderActions } from 'constants/orderConstants'

function orderCreateReducer(state = {}, action) {
  switch (action.type) {
    case OrderActions.ORDER_CREATE_LOADING:
      return { ...state, loading: true }
    case OrderActions.ORDER_CREATE_ERROR:
      return { loading: false, error: action.payload }
    case OrderActions.ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload }
    default:
      return state
  }
}

function orderDetailsReducer(
  state = {
    order: {
      orderItems: [],
      shipping: {},
      payment: {},
    },
  },
  action
) {
  switch (action.type) {
    case OrderActions.ORDER_GET_LOADING:
      return { ...state, loading: true }
    case OrderActions.ORDER_GET_ERROR:
      return { loading: false, error: action.payload }
    case OrderActions.ORDER_GET_SUCCESS:
      return { loading: false, success: true, order: action.payload }
    default:
      return state
  }
}

export { orderCreateReducer, orderDetailsReducer }
