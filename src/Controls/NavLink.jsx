import React from 'react';
import styled from 'styled-components';
import { NavLink, Link } from 'react-router-dom';
import { colors } from '../utils/color-palette';

export default styled(NavLink)`
  text-decoration: none;
  color: inherit;
`;

export const SimpleLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
