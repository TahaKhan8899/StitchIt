import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { BodyContainer, Row, Column } from 'components/common/layoutStyling'
import { FormButton } from 'components/common/FormComponents'
import styled from 'styled-components'
import { signin } from 'actions/userActions'

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

function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(signin(email, password))
  }
  return (
    <StyledBodyContainer>
      <FormContainer>
        <Row>
          <Column>
            <SignInText>Sign-In</SignInText>
          </Column>
          <FormInputColumn>
            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" onChange={(e) => setEmail(e.target.value)} />
          </FormInputColumn>
          <FormInputColumn>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormInputColumn>
          <FormInputColumn>
            <FormButton onClick={(e) => submitHandler(e)} bgColor="#f0c040" type="submit">
              Sign-In
            </FormButton>
          </FormInputColumn>
          <Column>New to StitchIt?</Column>
          <Column>
            <Link to="/register">
              <FormButton type="submit">Create your account</FormButton>
            </Link>
          </Column>
        </Row>
      </FormContainer>
    </StyledBodyContainer>
  )
}

export default SignIn
