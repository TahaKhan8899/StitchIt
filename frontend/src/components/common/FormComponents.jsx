import styled from 'styled-components'

const FormButton = styled.button`
  width: 100%;
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  background-color: ${(props) => (props.bgColor ? props.bgColor : '#f0f0f0')};
  border: 0.1rem #808080 solid;
  border-radius: 0.5rem;
  padding: 1rem;
  cursor: pointer;
  :hover {
    border: 0.1rem #404040 solid;
  }
`

const RandomDiv = styled.div``

export { FormButton, RandomDiv }
