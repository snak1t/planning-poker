import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { Header } from '../src/Shared/Components/Header/Header'
import { BrowserRouter as Router } from 'react-router-dom'

const module = storiesOf('Application Header', module)

module.add('header for logged in users', () => {
  return (
    <Router>
      <Header isLoggedIn={true} />
    </Router>
  )
})

module.add('header for not logged in users', () => {
  return (
    <Router>
      <Header isLoggedIn={false} />
    </Router>
  )
})
