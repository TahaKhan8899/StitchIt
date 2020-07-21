import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { userInitialState, cartInitialState } from 'constants/initialStates'
import {
  productListReducer,
  productDetailsReducer,
  createProductReducer,
  deletedProductReducer,
} from 'reducers/productReducers'
import { cartReducer } from 'reducers/cartReducers'
import { userReducer } from 'reducers/userReducers'
import { orderCreateReducer, orderDetailsReducer, orderPayReducer } from 'reducers/orderReducers'

const initialState = { cart: cartInitialState, user: userInitialState }

// TODO: Refactor the errors in the actions to 'error.response.message' instead of 'error' or 'error.message'
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  createdProduct: createProductReducer,
  deletedProduct: deletedProductReducer,
  cart: cartReducer,
  user: userReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// Thunk lets us run async actions
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)))
export default store
