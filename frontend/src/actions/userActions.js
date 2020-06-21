import {
  USER_SIGNIN_LOADING,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_ERROR,
  USER_REGISTER_LOADING,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_ERROR,
} from 'constants/userConstants'
import axios from 'axios'
import Cookie from 'js-cookie'

const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_LOADING })
  try {
    const { data } = await axios.post('/api/users/signin', { email, password })
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data })
    Cookie.set('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({ type: USER_SIGNIN_ERROR, payload: error })
  }
}

const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_LOADING })
  try {
    const { data } = await axios.post('/api/users/register', { name, email, password })
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data })
    Cookie.set('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({ type: USER_REGISTER_ERROR, payload: error })
  }
}

export { signin, register }
