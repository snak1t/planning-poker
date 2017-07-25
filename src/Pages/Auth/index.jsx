import React from 'react'
import { Route } from 'react-router-dom'

import { NavigationLink } from '../../Shared/Components/Controls'
import LoginComponent from './Components/Login'
import RegistrationComponent from './Components/Registration'
import './styles.css'
import {
  AuthBlock,
  AuthCenterBlock,
  Switcher,
  SwitcherSliderContainer,
  SwitcherCaret
} from './Styled.components'

const calculateSliderClassame = ({ pathname }) => pathname.endsWith('login')

export const AuthContainer = ({ match: { url }, location }) =>
  <AuthCenterBlock>
    <AuthBlock>
      <Switcher>
        <NavigationLink
          to={`${url}/login`}
          className="switcherElement"
          activeClassName="switcherElementSelected"
        >
          Login
        </NavigationLink>
        <NavigationLink
          to="/auth/registration"
          className="switcherElement"
          activeClassName="switcherElementSelected"
        >
          Registration
        </NavigationLink>
        <SwitcherSliderContainer>
          <SwitcherCaret left={calculateSliderClassame(location)} />
        </SwitcherSliderContainer>
      </Switcher>
      <div>
        <Route path={`${url}/login`} component={LoginComponent} />
        <Route path={`${url}/registration`} component={RegistrationComponent} />
      </div>
    </AuthBlock>
  </AuthCenterBlock>
