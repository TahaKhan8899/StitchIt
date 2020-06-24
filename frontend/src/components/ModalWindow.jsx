import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import PropTypes from 'prop-types'

import usePortal from 'reactHooks/usePortal'

const GlobalStyle = createGlobalStyle`
  body {
    overflow: hidden;
  }
`
const StyledWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  padding: 20px;
  background: #fcfeff;
  box-shadow: 0 3px 6px 0 rgba(0, 4, 15, 0.15);
  z-index: 999999;
`
const StyledOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
  height: 100%;
  width: 100%;
  background: #000;
  opacity: 0.8;
`

export default function ModalWindow({ className, children, onClickOverlay }) {
  const Portal = usePortal()

  return (
    <Portal>
      <GlobalStyle />
      <StyledOverlay onClick={onClickOverlay} />
      <StyledWrapper className={className}>{children}</StyledWrapper>
    </Portal>
  )
}
ModalWindow.propTypes = {
  className: PropTypes.string,
  onClickOverlay: PropTypes.func,
  children: PropTypes.any.isRequired,
}
ModalWindow.defaultProps = {
  className: '',
  onClickOverlay: () => {},
}
