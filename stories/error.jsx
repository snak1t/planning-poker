import React from 'react'
import { storiesOf, action, linkTo } from '@kadira/storybook'
import { ErrorComponent } from '../src/Shared/Components/Error/Component'

const module = storiesOf('Error Component', module)

module.add('Simple Error', () => {
  return <ErrorComponent error="User with this credentials wasnt found" />
})
