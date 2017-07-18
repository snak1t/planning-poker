import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  position: fixed;
  right: 20px;
  bottom: 20px;
  box-shadow: 0px 0px 1px 2px rgba(0,0,0,0.2);
  padding: 20px;
  width: 300px;
  background-color: #ef9a9a;
`;

const Header = styled.header`
  font-size: 1.2rem;
  font-weight: bold;
  line-height: 1.4rem;
`;

export const ErrorComponent = ({ error }) => {
  return (
    <Section>
      <Header>Error</Header>
      <div>{error}</div>
    </Section>
  );
};
