import styled from 'styled-components';
import { colors } from '../utils/color-palette';

export const Button = styled.button`
  margin: 0px 4px;
  line-height: ${props => (props.small ? 1.2 : 1.4)}rem;
  padding: ${props => (props.small ? '3px 6px' : '12px 32px')};
  border-width: ${props => (props.outline ? 0 : 2)}px;
  border-style: solid;
  border-color: ${colors.primaryColor};
  background-color: ${props => (props.primary ? colors.primaryColor : '#fff')};
  color: ${props => (props.primary ? '#fff' : colors.primaryColor)};
  border-radius: ${props => (props.outline ? 0 : 30)}px;
  font-size: ${props => (props.small ? 1 : 1.1)}rem;
  outline: none;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: ${props =>
      !props.primary && !props.outline ? colors.primaryColor : '#fff'};
    color: ${props =>
      !props.primary && !props.outline ? '#fff' : colors.primaryColor};
    box-shadow: ${props => (props.outline ? '0px 2px 0px 0px' : '0 0 2px 1px')}
      ${colors.primaryColor};
  }
  &:focus {
    box-shadow: ${props => (props.outline ? '0px 2px 0px 0px' : '0 0 2px 1px')}
      ${colors.primaryColor};
  }
`;
