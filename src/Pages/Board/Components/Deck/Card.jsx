import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { colors } from '../../../../utils/color-palette'

const Container = styled.div`
  flex-basis: 7vw;
  height: 9vw;
  border-radius: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 0px 10px;
  border: 1px solid lightgrey;
  box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.15);
  color: ${props => (props.red ? colors.redPrimary : '#000')};
  margin: 0px 4px;
  cursor: pointer;
  background-color: ${props => (props.back ? '#e0e0e0' : 'white')};
`

const Left = styled.div`
  flex-basis: 1.3rem;
  font-size: 1.3rem;
  line-height: 2rem;
  display: ${props => (props.back ? 'none' : 'initial')};
`

const Right = styled.div`
  flex-basis: 1.3rem;
  text-align: right;
  line-height: 2rem;
  font-size: 1.3rem;
  display: ${props => (props.back ? 'none' : 'initial')};
`

const Center = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  & > span:first-child {
    display: ${props => (props.back ? 'none' : 'initial')};
  }
  & span.fa {
    font-size: 1.4rem;
  }
  & > span.userName {
    font-size: 1.1rem;
  }
`

export const Card = ({ value, onClick, cardPicked, back = false, name }) => {
  const displayedValue =
    typeof value === 'string'
      ? /^\w/.test(value) ? <span className={`fa fa-${value}`} /> : value
      : value
  return (
    <Container onClick={() => onClick(value)} red={cardPicked} back={back}>
      <Left back={back}>
        {displayedValue}
      </Left>
      <Center back={back}>
        <span>
          {displayedValue}
        </span>
        {name &&
          <span className="userName">
            {name}
          </span>}
      </Center>
      <Right back={back}>
        {displayedValue}
      </Right>
    </Container>
  )
}

Card.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func,
  cardPicked: PropTypes.bool,
  back: PropTypes.bool,
  name: PropTypes.string
}
