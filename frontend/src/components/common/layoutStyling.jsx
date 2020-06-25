import styled from 'styled-components'
import { breakPoints, SystemColor } from 'globalConstants'

const BodyContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background-color: transparent;
  text-align: left;

  @media ${breakPoints.lg}, ${breakPoints.md} {
    padding: 0 32px;
  }

  @media ${breakPoints.sm}, ${breakPoints.xs} {
    padding: 0 16px;
  }
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-flow: row wrap;
`

const getResponsiveWidthBySize = (props, targetSize) => {
  const { xs, sm, md, lg, xl } = props
  if (targetSize === 'xs') {
    return xs || '100%'
  }
  if (targetSize === 'sm') {
    return sm || xs || '100%'
  }
  if (targetSize === 'md') {
    return md || sm || xs || '100%'
  }
  if (targetSize === 'lg') {
    return lg || md || sm || xs || '100%'
  }
  if (targetSize === 'xl') {
    return xl || lg || md || sm || xs || '100%'
  }
  return '100%'
}

const getDisplayStatus = (props, targetSize) => {
  const { visible, hidden } = props
  if (visible && hidden) {
    return true
  }
  if (visible) {
    return visible.includes(targetSize)
  }
  if (hidden) {
    return !hidden.includes(targetSize)
  }
  return true
}

const Column = styled.div`
  text-align-last: ${(props) => (props.align ? props.align : 'left')};
  @media only screen and ${breakPoints.xl} {
    width: ${(props) => getResponsiveWidthBySize(props, 'xl')};
    display: ${(props) => (getDisplayStatus(props, 'xl') ? 'flex' : 'none')};
    flex-flow: column;
  }
  @media only screen and ${breakPoints.lg} {
    width: ${(props) => getResponsiveWidthBySize(props, 'lg')};
    display: ${(props) => (getDisplayStatus(props, 'lg') ? 'flex' : 'none')};
    flex-flow: column;
  }
  @media only screen and ${breakPoints.md} {
    width: ${(props) => getResponsiveWidthBySize(props, 'md')};
    display: ${(props) => (getDisplayStatus(props, 'md') ? 'flex' : 'none')};
    flex-flow: column;
  }
  @media only screen and ${breakPoints.sm} {
    width: ${(props) => getResponsiveWidthBySize(props, 'sm')};
    display: ${(props) => (getDisplayStatus(props, 'sm') ? 'flex' : 'none')};
    flex-flow: column;
  }
  @media only screen and ${breakPoints.xs} {
    width: ${(props) => getResponsiveWidthBySize(props, 'xs')};
    display: ${(props) => (getDisplayStatus(props, 'xs') ? 'flex' : 'none')};
    flex-flow: column;
  }
`

const LoadingState = styled.div`
  color: ${SystemColor.uiElements.loadingYellow};
  padding: 1rem;
`
const ErrorState = styled.div`
  color: ${SystemColor.uiElements.errorRed};
  padding: 1rem;
`

export { BodyContainer, Row, Column, LoadingState, ErrorState }
