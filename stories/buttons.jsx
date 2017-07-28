import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { Button } from '../src/Shared/Components/Controls'

const module = storiesOf('Buttons', module)

module.add('simple button', () => {
  return <Button>Simple Button</Button>
})

module.add('disabled button', () => {
  return (
    <div>
      <div>disabled true</div>
      <Button disabled={true}>Simple Button</Button>
      <div>disabled false</div>
      <Button disabled={false}>Simple Button</Button>
    </div>
  )
})

module.add('submit button', () => {
  return <Button primary>Submit button</Button>
})

module.add('outline button', () => {
  return <Button outline>Submit button</Button>
})

module.add('small simple button', () => {
  return <Button small>Simple Button</Button>
})

module.add('small outline button', () => {
  return (
    <Button outline small>
      Submit button
    </Button>
  )
})
