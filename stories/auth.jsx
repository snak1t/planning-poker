import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { BrowserRouter as Router } from 'react-router-dom'
import { LoginComponent } from '../src/Pages/Auth/Components/Login'
import { AuthContainer } from '../src/Pages/Auth'

const module = storiesOf('Authentication page', module)

module.add('Login part of authentication', () => {
  return (
    <Router>
      <LoginComponent
        login="Ruslan Abramov"
        password="12345"
        performLogin={() => {}}
        handleLoginChange={() => {}}
        handlePasswordChange={() => {}}
      />
    </Router>
  )
})

module.add('AuthContainer', () => {
  return (
    <Router>
      <AuthContainer
        match={{ url: 'http://localhost:6006/' }}
        location={{ pathname: 'login' }}
      />
    </Router>
  )
})
