import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { BodyContainer } from './layoutStyling'
import styled from 'styled-components'
import SideBar from 'components/common/SideBar'
import { selectLoggedInUserState } from 'selectors/user'

const HomeSection = styled.div`
  display: flex;
  justify-content: center;
  a {
    color: #fff;
    font-size: 2.5rem;
    font-weight: bold;
    text-decoration: none;
    margin-left: 1rem;
  }
  a:hover {
    color: #ff8000;
  }
  button:hover {
    cursor: pointer;
  }
`

const StyledBodyContainer = styled(BodyContainer)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`

const LinkSection = styled.div`
  a {
    color: #fff;
    text-decoration: none;
    margin-right: 1.5rem;
  }
  a:hover {
    color: #ff8000;
  }
`

function Header() {
  const userInfo = useSelector(selectLoggedInUserState)
  const [isOpen, setIsOpen] = useState(false)
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }
  return (
    <header className="header">
      <SideBar toggleMenu={toggleMenu} isOpen={isOpen} />
      <StyledBodyContainer>
        <HomeSection>
          <button onClick={toggleMenu}>&#9776;</button>
          <Link to="/">StitchIt</Link>
        </HomeSection>
        <LinkSection>
          <Link to="/cart">Cart</Link>
          {userInfo ? (
            <Link to="/profile">Hi {userInfo.name}!</Link>
          ) : (
            <Link to="/signin">Sign In</Link>
          )}
        </LinkSection>
      </StyledBodyContainer>
    </header>
  )
}

export default Header
