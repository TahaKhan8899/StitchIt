import Cookie from 'js-cookie'

const commonInitialState = {
  data: null,
  loading: false,
  loaded: false,
  error: false,
}

const cartItems = Cookie.getJSON('cartItems') || []
const cartInitialState = { cartItems }

const userInfo = Cookie.getJSON('userInfo') || null
const userInitialState = { ...commonInitialState, data: { loggedInUser: userInfo } }

export { commonInitialState, cartInitialState, userInitialState }
