import {
  CART_LOADING,
  CART_ADD_PRODUCT,
  CART_ERROR,
  CART_REMOVE_PRODUCT,
} from 'constants/cartConstants'

function cartReducer(state = { cartItems: [] }, action) {
  switch (action.type) {
    case CART_LOADING:
      return { ...state, loading: true }
    case CART_ERROR:
      return { loading: false, error: action.payload }
    case CART_ADD_PRODUCT:
      const productToAdd = action.payload
      // Check to see if product is already in the cart, if it is, update the qty
      const isProductInCart = state.cartItems.find((cartItem) => cartItem._id === productToAdd._id)
      if (isProductInCart) {
        const updatedQty = productToAdd.qty
        return {
          cartItems: state.cartItems.map((cartItem) =>
            cartItem._id === productToAdd._id ? { ...cartItem, qty: updatedQty } : cartItem
          ),
          loading: false,
        }
      } else {
        //   Add new product to cartItems
        return { cartItems: [...state.cartItems, productToAdd], loading: false }
      }
    case CART_REMOVE_PRODUCT:
      const { productId } = action.payload
      return {
        cartItems: state.cartItems.filter((item) => {
          return item._id !== productId
        }),
      }
    default:
      return state
  }
}

export { cartReducer }
