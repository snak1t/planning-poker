import React from 'react'
import { storiesOf, action, linkTo } from '@kadira/storybook'
import { Card } from '../src/Pages/Board/Components/Deck/Card'
import { CardList } from '../src/Pages/Board/Components/Deck/List'
import styled from 'styled-components'

const Div = styled.div`
  width: 300px;
  height: 400px;
  display: flex;
`

const module = storiesOf('Deck of cards', module)

module.add('Simple card', () => {
  return (
    <Div>
      <Card value={11} />
    </Div>
  )
})

module.add('Red Variant', () => {
  return (
    <Div>
      <Card value={1} cardPicked />
    </Div>
  )
})

module.add('Card Back', () => {
  return (
    <Div>
      <Card value={1} back={true} />
    </Div>
  )
})

module.add('Card with player name', () => {
  return (
    <Div>
      <Card value={1} name="John Doe" />
    </Div>
  )
})

module.add('Card Back with player name', () => {
  return (
    <Div>
      <Card value={1} back={true} name="John Doe" />
    </Div>
  )
})

module.add('Card with Infinity Symbols', () => {
  return (
    <Div>
      <Card value="8734" />
    </Div>
  )
})

module.add('Card with question symbol', () => {
  return (
    <Div>
      <Card value="63" />
    </Div>
  )
})

module.add('Card with cup of coffee', () => {
  return (
    <Div>
      <Card value="63" />
    </Div>
  )
})

const deck = [
  { value: 1 },
  { value: 2 },
  { value: 3 },
  { value: 4 },
  { value: 5 },
  { value: 6 },
  { value: 7 },
  { value: 8 },
  { value: 9 },
  { value: 10 },
  { value: 11 },
  { value: 12 },
  { value: 13 }
]

module.add('All Deck', () => {
  return <CardList deck={deck} myScore={6} />
})
