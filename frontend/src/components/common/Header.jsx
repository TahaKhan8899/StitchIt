import React from 'react'
import { Link } from 'react-router-dom'
import { BodyContainer } from './layoutStyling'

function Header() {
  const openMenu = () => {
    document.querySelector('.sidebar').classList.add('open')
  }
  return (
    <header className="header">
      <BodyContainer>
        <div className="brand">
          <button onClick={openMenu}>&#9776;</button>
          <Link to="/">StitchIt</Link>
        </div>
        <div className="header-links">
          <a href="/">Cart</a>
          <a href="/">Sign In</a>
        </div>
      </BodyContainer>
    </header>
  )
}

export default Header
