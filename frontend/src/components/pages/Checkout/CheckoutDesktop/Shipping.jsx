import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { breakPoints } from 'globalConstants'
import { FormButton } from 'components/common/SystemStyledComponents'
import { BodyContainer, Row, Column } from 'components/common/layoutStyling'
import { saveShipping } from 'actions/cartActions'
import CheckoutSteps from './CheckoutSteps'

const StyledBodyContainer = styled(BodyContainer)`
  display: flex;
  justify-content: center;
`

const FormColumn = styled(Column)`
  align-items: center;
  @media only screen and ${breakPoints.sm_under} {
    width: 86%;
  }
`

const FormTitle = styled.h2`
  margin-bottom: 2rem;
`

const FormContainer = styled.div`
  display: flex;
  max-width: 30rem;
  width: 100%;
  border: 0.1rem #808080 solid;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-top: 3rem;
`

const FormInputColumn = styled(Column)`
  margin-bottom: 2rem;
  input {
    border: 0.1rem #c0c0c0 solid;
    border-radius: 0.5rem;
    padding: 1rem;
  }
`

function Shipping(props) {
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [country, setCountry] = useState('')
  const [province, setProvince] = useState('')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShipping(address, city, postalCode, country, province))
    props.history.push('/payment')
  }
  return (
    <StyledBodyContainer>
      <Row>
        <Column>
          <CheckoutSteps step1 step2 />
        </Column>
        <FormColumn>
          <FormContainer>
            <Row>
              <Column>
                <FormTitle>Shipping</FormTitle>
              </Column>
              <FormInputColumn>
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </FormInputColumn>
              <FormInputColumn>
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  onChange={(e) => setCity(e.target.value)}
                />
              </FormInputColumn>
              <FormInputColumn>
                <label htmlFor="postalCode">Postal Code</label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </FormInputColumn>
              <FormInputColumn>
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  onChange={(e) => setCountry(e.target.value)}
                />
              </FormInputColumn>
              <FormInputColumn>
                <label htmlFor="country">Province</label>
                <input
                  type="text"
                  id="province"
                  name="province"
                  onChange={(e) => setProvince(e.target.value)}
                />
              </FormInputColumn>
              <FormInputColumn>
                <FormButton onClick={(e) => submitHandler(e)} bgColor="#f0c040" type="submit">
                  Continue
                </FormButton>
              </FormInputColumn>
            </Row>
          </FormContainer>
        </FormColumn>
      </Row>
    </StyledBodyContainer>
  )
}

export default Shipping
