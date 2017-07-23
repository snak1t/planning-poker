import React from 'react'
import { Route } from 'react-router-dom'

import NavLink from '../../Shared/Components/Controls/Navigation.link'
import LoginComponent from './Components/Login'
import RegistrationComponent from './Components/Registration'
import './styles.css'

const calculateSliderClassame = ({ pathname }) =>
  `caret ${pathname.endsWith('login') ? 'caretLeft' : 'caretRight'}`

export const AuthContainer = ({ match: { url }, location }) =>
  <div className="center">
    <div className="auth">
      <div className="switcher">
        <NavLink
          to={`${url}/login`}
          className="switcherElement"
          activeClassName="switcherElementSelected"
        >
          Login
        </NavLink>
        <NavLink
          to="/auth/registration"
          className="switcherElement"
          activeClassName="switcherElementSelected"
        >
          Registration
        </NavLink>
        <div className="switcherSlider">
          <div className={calculateSliderClassame(location)} />
        </div>
      </div>
      <div>
        <Route path={`${url}/login`} component={LoginComponent} />
        <Route path={`${url}/registration`} component={RegistrationComponent} />
      </div>
    </div>
  </div>
