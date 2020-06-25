import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { SystemColor, breakPoints } from 'globalConstants'
import { FormButton } from 'components/common/SystemStyledComponents'
import {
  BodyContainer,
  Row,
  Column,
  ErrorState,
  LoadingState,
} from 'components/common/layoutStyling'
import { createProduct, getProductList, deleteProduct } from 'actions/productActions'
import { selectCreatedProductState, selectDeletedProductState } from 'selectors/product'
import ModalWindow from 'components/ModalWindow'
import DisplayAllProducts from './DisplayAllProducts'

const StyledBodyContainer = styled(BodyContainer)`
  display: flex;
  justify-content: center;
`

const FormText = styled.h2`
  margin-bottom: 2rem;
  @media only screen and ${breakPoints.sm_under} {
    font-size: 2.1rem;
  }
`

const FormContainer = styled.div`
  display: flex;
  max-width: 30rem;
  width: 100%;
  border-radius: 0.5rem;
`

const FormInputColumn = styled(Column)`
  margin-bottom: 2rem;
  input {
    border: 0.1rem #c0c0c0 solid;
    border-radius: 0.5rem;
    padding: 1rem;
  }
`

const ProductHeader = styled.div``
const OuterRow = styled(Row)`
  width: 100%;
`

const StateSection = styled.div`
  margin-bottom: 1.5rem;
`

const CreateContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`

function CreateProduct(props) {
  const [modalVisible, setModalVisible] = useState(false)
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
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

  const openDeleteModal = (product) => {
    setDeleteModalVisible(true)
    setId(product._id)
  }

  const createdProductState = useSelector(selectCreatedProductState)
  const {
    loading: createdProductLoading,
    error: createdProductError,
    success: createdProductSuccess,
  } = createdProductState

  const deletedProductState = useSelector(selectDeletedProductState)
  const { success: deleteProductSuccess } = deletedProductState

  const dispatch = useDispatch()

  useEffect(() => {
    if (createdProductSuccess) {
      setModalVisible(false)
    }
    if (deleteProductSuccess) {
      setDeleteModalVisible(false)
    }
    dispatch(getProductList())
  }, [dispatch, createdProductSuccess, deleteProductSuccess])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProduct({ id, name, price, image, brand, category, inventoryCount, description })
    )
  }

  const deleteHandler = () => {
    dispatch(deleteProduct(id))
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
            {deleteModalVisible && (
              <ModalWindow onClickOverlay={() => setDeleteModalVisible(false)}>
                <FormContainer>
                  <Row>
                    <Column>
                      <FormText>Are you sure you want to delete this product?</FormText>
                    </Column>
                    <FormInputColumn>
                      <FormButton
                        onClick={() => deleteHandler()}
                        bgColor={SystemColor.uiElements.buttonOrange}
                        type="submit"
                      >
                        Delete
                      </FormButton>
                      <FormButton onClick={() => setDeleteModalVisible(false)}>Cancel</FormButton>
                    </FormInputColumn>
                  </Row>
                </FormContainer>
              </ModalWindow>
            )}
            {modalVisible && (
              <ModalWindow onClickOverlay={() => setModalVisible(false)}>
                <FormContainer>
                  <Row>
                    <Column>
                      <FormText>Create Product</FormText>
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
                        value={name || ''}
                        type="text"
                        id="name"
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </FormInputColumn>
                    <FormInputColumn>
                      <label htmlFor="Price">Price</label>
                      <input
                        value={price || ''}
                        type="number"
                        onKeyDown={(evt) => evt.key === 'e' && evt.preventDefault()}
                        id="price"
                        name="price"
                        onChange={(e) => setPrice(parseInt(e.target.value, 10))}
                      />
                    </FormInputColumn>
                    <FormInputColumn>
                      <label htmlFor="Description">Description</label>
                      <input
                        value={description || ''}
                        type="text"
                        id="description"
                        name="description"
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </FormInputColumn>
                    <FormInputColumn>
                      <label htmlFor="Image">Image</label>
                      <input
                        value={image || ''}
                        type="text"
                        id="image"
                        name="image"
                        onChange={(e) => setImage(e.target.value)}
                      />
                    </FormInputColumn>
                    <FormInputColumn>
                      <label htmlFor="Brand">Brand</label>
                      <input
                        value={brand || ''}
                        type="text"
                        id="brand"
                        name="brand"
                        onChange={(e) => setBrand(e.target.value)}
                      />
                    </FormInputColumn>
                    <FormInputColumn>
                      <label htmlFor="Category">Category</label>
                      <input
                        value={category || ''}
                        type="text"
                        id="category"
                        name="category"
                        onChange={(e) => setCategory(e.target.value)}
                      />
                    </FormInputColumn>
                    <FormInputColumn>
                      <label htmlFor="Inventory">Inventory Count</label>
                      <input
                        value={inventoryCount || ''}
                        type="number"
                        onKeyDown={(evt) => evt.key === 'e' && evt.preventDefault()}
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
                        {id ? 'Update' : 'Create'}
                      </FormButton>
                      <FormButton onClick={() => setModalVisible(false)}>Cancel</FormButton>
                    </FormInputColumn>
                  </Row>
                </FormContainer>
              </ModalWindow>
            )}
          </CreateContainer>
        </Column>
        <Column>
          <DisplayAllProducts openDeleteModal={openDeleteModal} openModal={openModal} />
        </Column>
      </OuterRow>
    </StyledBodyContainer>
  )
}

export default CreateProduct
