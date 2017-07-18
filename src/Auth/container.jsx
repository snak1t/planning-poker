import React from 'react';
import { Route } from 'react-router-dom';
import NavLink from '../Controls/NavLink';
import LoginComponent from './login';
import RegistrationComponent from './register';
import './styles.css';

export const AuthContainer = ({ match, location }) =>
  <div className="center">
    <div className="auth">
      <div className="switcher">
        <NavLink
          to={`${match.url}/login`}
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
          <div
            className={
              'caret ' +
              (location.pathname.endsWith('login') ? 'caretLeft' : 'caretRight')
            }
          />
        </div>
      </div>

      <div>
        <Route path={`${match.url}/login`} component={LoginComponent} />
        <Route
          path={`${match.url}/registration`}
          component={RegistrationComponent}
        />
      </div>
    </div>
  </div>;
