import React from 'react';
import styled from 'styled-components';

export const OutlineButton = styled.button`
  line-height: 1.4rem;
  border: none;
  color: #111;
  font-size: 1rem;
  background-color: #fff;
  outline: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
  &:focus {
    text-decoration: underline;
    color: #980a17;
  }
`;
