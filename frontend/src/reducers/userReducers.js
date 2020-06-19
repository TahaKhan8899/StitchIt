import {
  USER_SIGNIN_LOADING,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_ERROR,
} from 'constants/userConstants'
import { commonInitialState } from './constants'

function userSigninReducer(state = commonInitialState, action) {
  switch (action.type) {
    case USER_SIGNIN_LOADING:
      return { ...state, loading: true }
    case USER_SIGNIN_SUCCESS:
      return { ...state, loading: false, data: { loggedInUser: action.payload } }
    case USER_SIGNIN_ERROR:
      return { ...state, loading: false, data: { loggedInUser: action.payload } }
    default:
      return state
  }
}
export { userSigninReducer }
