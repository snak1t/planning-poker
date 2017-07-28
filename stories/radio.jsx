import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { RadioGroup, RadioButton } from '../src/Shared/Components/Controls'

const module = storiesOf('Radio Group', module)

module.add('Radio Group', () => {
  return (
    <RadioGroup name="g1" onChange={e => console.log(e.target.value)}>
      <RadioButton value="1" label="StarWars" />
      <RadioButton value="2" label="Warcraft" />
      <RadioButton value="3" label="Grand Thieft Auto" />
    </RadioGroup>
  )
})
