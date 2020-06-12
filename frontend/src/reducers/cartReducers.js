import { CART_LOADING, CART_ADD_PRODUCT, CART_SUCCESS } from 'constants/cartConstants'

function cartReducer(state = { cartItems: [] }, action) {
  switch (action.type) {
    case CART_ADD_PRODUCT:
      const productToAdd = action.payload
      console.log('Adding: ', productToAdd)
      // Check to see if product is already in the cart, if it is, update the qty
      const productInCart = state.cartItems.find((cartItem) => cartItem._id === productToAdd._id)
      if (productInCart) {
        //   update cartItems
        console.log('already in cart')
        const newQty = productToAdd.qty
        return {
          cartItems: state.cartItems.map((cartItem) =>
            cartItem._id === productToAdd._id ? { ...cartItem, qty: newQty } : cartItem
          ),
        }
      } else {
        //   Add new product to cartItems
        console.log('Adding new to cart')
        return { cartItems: [...state.cartItems, productToAdd] }
      }
    default:
      return state
  }
}

export { cartReducer }
