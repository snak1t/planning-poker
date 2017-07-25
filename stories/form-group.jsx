import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { FormGroup, Input, Label } from '../src/Shared/Components/Controls'
import styled from 'styled-components'
import { ValidationErrors } from '../src/Shared/Components/Error/Validation.error'

const module = storiesOf('Form Input', module)

const DivWidth = styled.div`
  width: 640px;
  position: relative;
`

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

module.add('Validation Errors', () => {
  const errors = [
    {
      title: 'Login field',
      messages: ['Login must be unique', 'Login must be more than 4 characters']
    },
    {
      title: 'Password field',
      messages: ['Password must be more than 4 characters']
    },
    {
      title: 'Confirmation password field',
      messages: ['Confirmation password must be equal to password']
    }
  ]
  return (
    <DivWidth>
      <ValidationErrors errors={errors} />
    </DivWidth>
  )
})
