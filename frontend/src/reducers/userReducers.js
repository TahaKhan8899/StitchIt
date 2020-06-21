import {
  USER_SIGNIN_LOADING,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_ERROR,
  USER_REGISTER_LOADING,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_ERROR,
} from 'constants/userConstants'
import { userInitialState } from 'constants/initialStates'

function userReducer(state = userInitialState, action) {
  switch (action.type) {
    case USER_SIGNIN_LOADING:
      return { ...state, loading: true }
    case USER_SIGNIN_SUCCESS:
      return { ...state, loading: false, data: { loggedInUser: action.payload } }
    case USER_SIGNIN_ERROR:
      return { ...state, loading: false, error: action.payload }
    case USER_REGISTER_LOADING:
      return { ...state, loading: true }
    case USER_REGISTER_SUCCESS:
      return { ...state, loading: false, data: { loggedInUser: action.payload } }
    case USER_REGISTER_ERROR:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}
export { userReducer }
