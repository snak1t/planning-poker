import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { FormGroup, Input, Label } from '../src/Shared/Components/Controls'
import styled from 'styled-components'

const module = storiesOf('Form Input', module)

const DivWidth = styled.div`width: 640px;`

module.add('Base Form Input', () => {
  return (
    <DivWidth>
      <FormGroup>
        <Label htmlFor="text">UserName</Label>
        <Input
          id="text"
          type="text"
          placeholder="UserName"
          value={'John'}
          onChange={e => {}}
        />
      </FormGroup>
    </DivWidth>
  )
})
