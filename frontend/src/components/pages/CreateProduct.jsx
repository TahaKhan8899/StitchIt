import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { SystemColor } from 'globalConstants'
import { FormButton } from 'components/common/SystemStyledComponents'
import { BodyContainer, Row, Column } from 'components/common/layoutStyling'
import { createProduct } from 'actions/productActions'

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
  margin-top: 10rem;
`

const FormInputColumn = styled(Column)`
  margin-bottom: 2rem;
  input {
    border: 0.1rem #c0c0c0 solid;
    border-radius: 0.5rem;
    padding: 1rem;
  }
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

function CreateProduct(props) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [inventoryCount, setInventoryCount] = useState(0)
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()
  // const newProductState = useSelector(selectNewProductState)
  // const {
  //   loading,
  //   data: { newProduct },
  //   error,
  // } = newProductState

  // useEffect(() => {
  //   if (newProduct) {
  //     props.history.push('/')
  //   }
  // }, [loggedInUser, props.history])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createProduct({ name, price, image, brand, category, inventoryCount, description }))
  }
  return (
    <StyledBodyContainer>
      <FormContainer>
        <Row>
          <Column>
            <SignInText>Create Product</SignInText>
          </Column>
          <StateSection>
            {/* {loading && <LoadingState>Loading...</LoadingState>}
            {error && <ErrorState>{error.response.data.msg}</ErrorState>} */}
          </StateSection>
          <FormInputColumn>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" onChange={(e) => setName(e.target.value)} />
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
            <input type="text" id="image" name="image" onChange={(e) => setImage(e.target.value)} />
          </FormInputColumn>
          <FormInputColumn>
            <label htmlFor="Brand">Brand</label>
            <input type="text" id="brand" name="brand" onChange={(e) => setBrand(e.target.value)} />
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
            <FormButton onClick={(e) => submitHandler(e)} bgColor="#f0c040" type="submit">
              Create
            </FormButton>
          </FormInputColumn>
        </Row>
      </FormContainer>
    </StyledBodyContainer>
  )
}

export default CreateProduct
