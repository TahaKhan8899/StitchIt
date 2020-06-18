import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { BodyContainer, Row, Column } from 'components/common/layoutStyling'
import styled from 'styled-components'
import { useState } from 'react'

const StyledBodyContainer = styled(BodyContainer)`
  display: flex;
  justify-content: center;
`

const FormContainer = styled.div`
  display: flex;
  max-width: 45rem;
  width: 100%;
  border: 0.1rem #808080 solid;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-top: 10rem;
`

function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const submitHandler = (e) => {
    e.preventDefault()
  }
  return (
    <StyledBodyContainer>
      <FormContainer>
        <Row>
          <Column>
            <h3>Sign-In</h3>
          </Column>
          <Column>
            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" onChange={(e) => setEmail(e.target.value)} />
          </Column>
          <Column>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Column>
          <Column>
            <button type="submit">Signin</button>
          </Column>
          <Column>New to StitchIt?</Column>
          <Column>
            <Link to="/register">Create your account</Link>
          </Column>
        </Row>
      </FormContainer>
    </StyledBodyContainer>
  )
}

export default SignIn
