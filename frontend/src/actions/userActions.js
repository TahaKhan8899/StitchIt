import {
  USER_SIGNIN_LOADING,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_ERROR,
} from 'constants/userConstants'
import axios from 'axios'
import Cookie from 'js-cookie'

const signin = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_SIGNIN_LOADING })
    const { data } = await axios.post('/api/users/signin', { email, password })
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data })
    Cookie.set('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({ type: USER_SIGNIN_ERROR, payload: error })
  }
}

export { signin }
