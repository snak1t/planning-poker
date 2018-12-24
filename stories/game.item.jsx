import React from 'react'
import { storiesOf, action, linkTo } from '@kadira/storybook'
import { GameItem } from '../src/Pages/Games/Components/Item'
import styled from 'styled-components'

const FixedWidthDiv = styled.div`width: 640px;`

const module = storiesOf('Game Item', module)

module.add('default', () => {
  return (
    <FixedWidthDiv>
      <GameItem title="First Title" />
    </FixedWidthDiv>
  )
})
