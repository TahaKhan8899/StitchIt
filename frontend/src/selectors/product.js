import { createSelector } from 'reselect'

const selectProductListState = (state) => state.productList
const selectCreatedProductState = (state) => state.createdProduct
const selectDeletedProductState = (state) => state.deletedProduct

const selectProductList = createSelector(
  selectProductListState,
  (productListState) => productListState.products
)

const selectCreatedProduct = createSelector(
  selectCreatedProductState,
  (CreatedProductState) => CreatedProductState.createdProduct
)

const selectDeletedProduct = createSelector(
  selectDeletedProductState,
  (DeletedProductState) => DeletedProductState.deletedProduct
)

export {
  selectProductListState,
  selectCreatedProductState,
  selectDeletedProductState,
  selectProductList,
  selectCreatedProduct,
  selectDeletedProduct,
}
