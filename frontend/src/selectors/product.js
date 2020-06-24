import { createSelector } from 'reselect'

const selectProductListState = (state) => state.productList
const selectCreatedProductState = (state) => state.createdProduct

const selectProductList = createSelector(
  selectProductListState,
  (productListState) => productListState.products
)

const selectCreatedProduct = createSelector(
  selectCreatedProductState,
  (CreatedProductState) => CreatedProductState.createdProduct
)

export {
  selectProductListState,
  selectCreatedProductState,
  selectProductList,
  selectCreatedProduct,
}
