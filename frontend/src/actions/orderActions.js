import axios from 'axios'
import { Actions as OrderActions } from 'constants/orderConstants'

const orderCreate = (order) => async (dispatch, getState) => {
  dispatch({ type: OrderActions.ORDER_CREATE_LOADING, payload: order })
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
    dispatch({ type: OrderActions.ORDER_CREATE_SUCCESS, payload: newOrder })
  } catch (error) {
    dispatch({ type: OrderActions.ORDER_CREATE_ERROR, payload: error.message })
  }
}

const getOrderDetails = (orderId) => async (dispatch, getState) => {
  try {
    const {
      user: {
        data: { loggedInUser },
      },
    } = getState()
    dispatch({ type: OrderActions.ORDER_GET_LOADING, payload: orderId })
    const { data } = await axios.get('/api/orders/' + orderId, {
      headers: {
        Authorization: ' Bearer ' + loggedInUser.token,
      },
    })
    dispatch({ type: OrderActions.ORDER_GET_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: OrderActions.ORDER_GET_ERROR, payload: error.message })
  }
}

export { orderCreate, getOrderDetails }
