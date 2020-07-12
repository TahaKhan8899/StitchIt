import { Actions as OrderActions } from 'constants/orderConstants'

function createOrderReducer(state = {}, action) {
  switch (action.type) {
    case OrderActions.CREATE_ORDER_LOADING:
      return { ...state, loading: true }
    case OrderActions.CREATE_ORDER_ERROR:
      return { loading: false, error: action.payload }
    case OrderActions.CREATE_ORDER_SUCCESS:
      return { loading: false, success: true, order: action.payload }
    default:
      return state
  }
}

function getOrderReducer(
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
    case OrderActions.GET_ORDER_LOADING:
      return { ...state, loading: true }
    case OrderActions.GET_ORDER_ERROR:
      return { loading: false, error: action.payload }
    case OrderActions.GET_ORDER_SUCCESS:
      return { loading: false, success: true, order: action.payload }
    default:
      return state
  }
}

export { createOrderReducer, getOrderReducer }
