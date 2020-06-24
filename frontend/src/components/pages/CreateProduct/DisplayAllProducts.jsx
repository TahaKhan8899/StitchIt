import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { SystemColor } from 'globalConstants'
import { selectProductListState } from 'selectors/product'

const AllProductsContainer = styled.div``
const StateSection = styled.div`
  margin-bottom: 1.5rem;
`
const LoadingState = styled.div`
  color: ${SystemColor.uiElements.loadingYellow};
`
const ErrorState = styled.div`
  color: ${SystemColor.uiElements.errorRed};
`

function DisplayAllProducts({ openModal }) {
  const productListState = useSelector(selectProductListState)
  const {
    loading: productListLoading,
    error: productListError,
    products: allProducts,
  } = productListState
  return (
    <AllProductsContainer>
      <StateSection>
        {productListLoading && <LoadingState>Loading Products...</LoadingState>}
        {productListError && <ErrorState>{productListError.response.data.msg}</ErrorState>}
      </StateSection>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allProducts.map((product, idx) => (
            <tr key={`prod-num-${idx}`}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td>
                <button onClick={() => openModal(product)}>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AllProductsContainer>
  )
}

export default DisplayAllProducts
