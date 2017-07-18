import styled from 'styled-components';

export const FlexContainer = styled.section`
  display: flex;
  flex-direction: ${props => (props.vertical ? 'column' : 'row')};
  flex: 1;
  justify-content: ${props => (props.justify ? props.justify : 'center')};
`;

export const FlexItem = styled.div`
  ${props => props.asContainer && 'display: flex;'} ${props =>
      props.grow && `flex-grow: ${props.grow}`};
  ${props => props.basis && `flex-basis: ${props.basis}`};
  margin: 10px;
`;
