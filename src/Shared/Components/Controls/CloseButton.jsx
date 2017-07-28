import styled from 'styled-components'

export const CloseButton = styled.button`
  border: none;
  background-color: transparent;
  font-family: sans-serif;
  font-size: 2rem;
  line-height: 2rem;
  width: 2rem;
  text-align: center;
  transform: rotate(45deg);
  cursor: pointer;
  &:after {
    content: "+";
  }
  &:focus {
    outline: none;
  }

  ${props =>
    props.topRight
      ? `
    position: absolute;
    top: 0.2rem;
    right: 1rem;
    `
      : ``};
`
