import axios from 'axios'
import {
  CREATE_ORDER_LOADING,
  CREATE_ORDER_ERROR,
  CREATE_ORDER_SUCCESS,
} from 'constants/orderConstants'

const createOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: CREATE_ORDER_LOADING, payload: order })
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
    console.log('API ', newOrder)
    dispatch({ type: CREATE_ORDER_SUCCESS, payload: newOrder })
  } catch (error) {
    dispatch({ type: CREATE_ORDER_ERROR, payload: error.message })
  }
}

export { createOrder }
