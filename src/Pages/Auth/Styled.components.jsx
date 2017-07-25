import styled from 'styled-components'

export const AuthFormContainer = styled.div`margin-top: 1rem;`
export const AuthFormTitle = styled.h2`
  text-align: center;
  display: block;
  font-size: 1.4rem;
  font-family: 'Helvetica';
  line-height: 2rem;
`

export const AuthBlock = styled.div`
  width: 100%;
  max-width: 640px;
  min-width: 300px;
  padding: 20px;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, .6);
  background-color: #fff;
`

export const AuthCenterBlock = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const Switcher = styled.div`
  display: flex;
  margin: 0.4rem;
  justify-content: space-between;
  flex-wrap: wrap;
`

export const SwitcherSliderContainer = styled.div`
  height: 2px;
  position: relative;
  flex-basis: 100%;
`

export const SwitcherCaret = styled.div`
  position: absolute;
  top: 0px;
  left: ${props => (props.left ? 0 : 50)}%;
  height: 2px;
  width: 50%;
  background-color: #009688;
  transition: all cubic-bezier(0.39, 0.575, 0.565, 1) 0.1s;
`
