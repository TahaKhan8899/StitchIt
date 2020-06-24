import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { userInitialState, cartInitialState } from 'constants/initialStates'
import {
  productListReducer,
  productDetailsReducer,
  createProductReducer,
} from 'reducers/productReducers'
import { cartReducer } from 'reducers/cartReducers'
import { userReducer } from 'reducers/userReducers'

const initialState = { cart: cartInitialState, user: userInitialState }

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  createdProduct: createProductReducer,
  cart: cartReducer,
  user: userReducer,
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// Thunk lets us run async actions
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)))
export default store
