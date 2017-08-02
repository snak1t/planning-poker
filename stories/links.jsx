import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { NavigationLink } from '../src/Shared/Components/Controls/Navigation.link'
import { BrowserRouter as Router } from 'react-router-dom'

const module = storiesOf('Links from router', module)

module.add('Simple Links', () => {
  return (
    <Router>
      <NavigationLink to="/">Simple link</NavigationLink>
    </Router>
  )
})
