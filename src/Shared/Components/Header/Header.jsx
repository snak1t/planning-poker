import React from 'react'
import styled from 'styled-components'
import { SimpleLink } from '../Controls/Navigation.link'
import QuickGame from '../Game/Quick.game'

const HeaderDiv = styled.header`
  background-color: #009688;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
`

const Title = styled.h1`
  color: #e0f2f1;
  font-family: "Helvetica";
  font-size: 1.6rem;
`

export const Header = () =>
  <HeaderDiv>
    <Title>
      <SimpleLink to="/">Free Planning Poker</SimpleLink>
    </Title>
    <div>
      <QuickGame />
    </div>
  </HeaderDiv>
