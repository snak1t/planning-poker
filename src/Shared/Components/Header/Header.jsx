import React from 'react'
import styled from 'styled-components'
import { SimpleLink } from '../Controls/Navigation.link'
import QuickGame from '../Game/Quick.game'
import { doLogout } from '../../../Data/Auth/actions.js'
import { connect } from 'react-redux'
import { isUserLoggedIn } from '../../../Data/Auth'
import { Button } from '../Controls/Button'

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

const mapStateToProps = state => ({
  isLoggedIn: isUserLoggedIn(state)
})

const mapDispatchToProps = dispatch => ({
  doLogout: () => dispatch(doLogout())
})

export const Header = ({ doLogout, isLoggedIn }) =>
  <HeaderDiv>
    <Title>
      <SimpleLink to="/">Free Planning Poker</SimpleLink>
    </Title>
    {isLoggedIn ? <Button onClick={doLogout}>Logout</Button> : null}
    <QuickGame />
  </HeaderDiv>

export default connect(mapStateToProps, mapDispatchToProps)(Header)
