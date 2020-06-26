import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { SystemColor } from 'globalConstants'
import { FormButton } from 'components/common/SystemStyledComponents'
import { BodyContainer, Row, Column } from 'components/common/layoutStyling'
import { register } from 'actions/userActions'
import { selectUserState } from 'selectors/user'

const StyledBodyContainer = styled(BodyContainer)`
  display: flex;
  justify-content: center;
`

const RegisterText = styled.h2`
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

function Register(props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const [rePassword, setRePassword] = useState('')
  const dispatch = useDispatch()
  const userState = useSelector(selectUserState)
  const {
    loading,
    data: { loggedInUser },
    error,
  } = userState

  const redirect = props.location.search ? props.location.search.split('=')[1] : '/'
  useEffect(() => {
    if (loggedInUser) {
      props.history.push(redirect)
    }
  }, [loggedInUser, props.history, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(register(name, email, password))
  }
  return (
    <StyledBodyContainer>
      <FormContainer>
        <Row>
          <Column>
            <RegisterText>Create an Account</RegisterText>
          </Column>
          <StateSection>
            {loading && <LoadingState>Loading...</LoadingState>}
            {error && <ErrorState>{error.response.data.msg}</ErrorState>}
          </StateSection>
          <FormInputColumn>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" onChange={(e) => setName(e.target.value)} />
          </FormInputColumn>
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
          {/* {//TODO FUNCTIONALITY FOR RE-ENTER PASSWORD} */}
          {/* <FormInputColumn>
            <label htmlFor="rePassword">Re-Enter Password</label>
            <input
              type="password"
              id="rePassword"
              name="rePassword"
              onChange={(e) => setRePassword(e.target.value)}
            />
          </FormInputColumn> */}
          <FormInputColumn>
            <FormButton onClick={(e) => submitHandler(e)} bgColor="#f0c040" type="submit">
              Register
            </FormButton>
          </FormInputColumn>
          <Column>Already have an account?</Column>
          <Column>
            <Link to={redirect === '/' ? 'signin' : 'signin?redirect=' + redirect}>
              <FormButton type="submit">Create your account</FormButton>
            </Link>
          </Column>
        </Row>
      </FormContainer>
    </StyledBodyContainer>
  )
}

export default Register
