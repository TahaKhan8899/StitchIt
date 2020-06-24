import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { SystemColor } from 'globalConstants'
import { FormButton } from 'components/common/SystemStyledComponents'
import { BodyContainer, Row, Column } from 'components/common/layoutStyling'
import { createProduct, getProductList } from 'actions/productActions'
import { selectProductListState, selectCreatedProductState } from 'selectors/product'

const StyledBodyContainer = styled(BodyContainer)`
  display: flex;
  justify-content: center;
`

const SignInText = styled.h2`
  margin-bottom: 2rem;
`

const FormContainer = styled.div`
  display: flex;
  max-width: 30rem;
  width: 100%;
  border: 0.1rem #808080 solid;
  border-radius: 0.5rem;
  padding: 1.5rem;
`

const FormInputColumn = styled(Column)`
  margin-bottom: 2rem;
  input {
    border: 0.1rem #c0c0c0 solid;
    border-radius: 0.5rem;
    padding: 1rem;
  }
`

const AllProductsContainer = styled.div``
const ProductHeader = styled.div``
const OuterRow = styled(Row)`
  width: 100%;
`

const StateSection = styled.div`
  margin-bottom: 1.5rem;
`
const LoadingState = styled.div`
  color: ${SystemColor.uiElements.loadingYellow};
`
const ErrorState = styled.div`
  color: ${SystemColor.uiElements.errorRed};
`

const CreateContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
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
          <tbody>
            {allProducts.map((product) => (
              <tr>
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
        </thead>
      </table>
    </AllProductsContainer>
  )
}

function CreateProduct(props) {
  const [modalVisible, setModalVisible] = useState(false)
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [inventoryCount, setInventoryCount] = useState(0)
  const [description, setDescription] = useState('')

  const openModal = (product) => {
    setModalVisible(true)
    setId(product._id)
    setName(product.name)
    setPrice(product.price)
    setImage(product.image)
    setBrand(product.brand)
    setCategory(product.category)
    setInventoryCount(product.inventoryCount)
    setDescription(product.description)
  }

  const createdProductState = useSelector(selectCreatedProductState)
  const { loading: createdProductLoading, error: createdProductError } = createdProductState

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProductList())
  }, [dispatch])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createProduct({ name, price, image, brand, category, inventoryCount, description }))
  }
  return (
    <StyledBodyContainer>
      <OuterRow>
        <Column>
          <CreateContainer>
            <ProductHeader>
              <h3>All Products</h3>
              <FormButton
                onClick={() => openModal({})}
                bgColor={SystemColor.uiElements.buttonOrange}
              >
                Create Product
              </FormButton>
            </ProductHeader>
            {modalVisible && (
              <FormContainer>
                <Row>
                  <Column>
                    <SignInText>Create Product</SignInText>
                  </Column>
                  <StateSection>
                    {createdProductLoading && <LoadingState>Creating...</LoadingState>}
                    {createdProductError && (
                      <ErrorState>{createdProductError.response.data.msg}</ErrorState>
                    )}
                  </StateSection>
                  <FormInputColumn>
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </FormInputColumn>
                  <FormInputColumn>
                    <label htmlFor="Price">Price</label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      onChange={(e) => setPrice(parseInt(e.target.value, 10))}
                    />
                  </FormInputColumn>
                  <FormInputColumn>
                    <label htmlFor="Description">Description</label>
                    <input
                      type="text"
                      id="description"
                      name="description"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </FormInputColumn>
                  <FormInputColumn>
                    <label htmlFor="Image">Image</label>
                    <input
                      type="text"
                      id="image"
                      name="image"
                      onChange={(e) => setImage(e.target.value)}
                    />
                  </FormInputColumn>
                  <FormInputColumn>
                    <label htmlFor="Brand">Brand</label>
                    <input
                      type="text"
                      id="brand"
                      name="brand"
                      onChange={(e) => setBrand(e.target.value)}
                    />
                  </FormInputColumn>
                  <FormInputColumn>
                    <label htmlFor="Category">Category</label>
                    <input
                      type="text"
                      id="category"
                      name="category"
                      onChange={(e) => setCategory(e.target.value)}
                    />
                  </FormInputColumn>
                  <FormInputColumn>
                    <label htmlFor="Inventory">Inventory Count</label>
                    <input
                      type="number"
                      id="inventory"
                      name="inventory"
                      onChange={(e) => setInventoryCount(parseInt(e.target.value, 10))}
                    />
                  </FormInputColumn>
                  <FormInputColumn>
                    <FormButton
                      onClick={(e) => submitHandler(e)}
                      bgColor={SystemColor.uiElements.buttonOrange}
                      type="submit"
                    >
                      Create
                    </FormButton>
                    <FormButton onClick={() => setModalVisible(false)}>Cancel</FormButton>
                  </FormInputColumn>
                </Row>
              </FormContainer>
            )}
          </CreateContainer>
        </Column>
        <Column>
          <DisplayAllProducts openModal={openModal} />
        </Column>
      </OuterRow>
    </StyledBodyContainer>
  )
}

export default CreateProduct
