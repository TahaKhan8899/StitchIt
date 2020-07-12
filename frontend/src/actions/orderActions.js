import axios from 'axios'
import { Actions as OrderActions } from 'constants/orderConstants'

const createOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: OrderActions.CREATE_ORDER_LOADING, payload: order })
  try {
    const {
      user: {
        data: { loggedInUser },
      },
    } = getState()
    const {
      data: { data: newOrder },
    } = await axios.post('/api/orders', order, {
      headers: {
        Authorization: ' Bearer ' + loggedInUser.token,
      },
    })
    dispatch({ type: OrderActions.CREATE_ORDER_SUCCESS, payload: newOrder })
  } catch (error) {
    dispatch({ type: OrderActions.CREATE_ORDER_ERROR, payload: error.message })
  }
}

const getOrderDetails = (orderId) => async (dispatch, getState) => {
  try {
    const {
      user: {
        data: { loggedInUser },
      },
    } = getState()
    dispatch({ type: OrderActions.GET_ORDER_LOADING, payload: orderId })
    const { data } = await axios.get('/api/orders/' + orderId, {
      headers: {
        Authorization: ' Bearer ' + loggedInUser.token,
      },
    })
    dispatch({ type: OrderActions.GET_ORDER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: OrderActions.GET_ORDER_ERROR, payload: error.message })
  }
}

export { createOrder, getOrderDetails }
