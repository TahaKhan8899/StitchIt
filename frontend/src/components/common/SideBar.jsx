import React, { useState } from 'react'
import styled from 'styled-components'

const SideBarContainer = styled.aside`
  position: fixed;
  transition: all 0.5s;
  transform: ${(props) => (props.isOpen ? 'translateX(0)' : 'translateX(-30rem)')};
  width: 30rem;
  background-color: #f0f0f0;
  height: 100%;
`

const SideBarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
  padding: 0.5rem;
  background: none;
  border: none;
  color: #000;
  cursor: pointer;
`

const CloseButton = styled.button`
  border-radius: 50%;
  border: 0.1rem solid black;
  width: 3rem;
  height: 3rem;
  padding: 0.5rem;
  font-size: 2rem;
  padding: 0;
  cursor: pointer;
  right: 0.5rem;
  top: 1.5rem;
`

function SideBar({ toggleMenu, isOpen }) {
  return (
    <SideBarContainer isOpen={isOpen}>
      <SideBarHeader>
        <div>Shopping Categories</div>
        <CloseButton onClick={toggleMenu}>X</CloseButton>
      </SideBarHeader>
      <ul>
        <li>
          <a href="/">Bookmarks</a>
        </li>
        <li>
          <a href="/">Mugs</a>
        </li>
      </ul>
    </SideBarContainer>
  )
}

export default SideBar
