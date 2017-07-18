import React from 'react';
import { Route } from 'react-router-dom';
import NavLink from '../Controls/NavLink';
import LoginComponent from './login';
import RegistrationComponent from './register';
import styles from './styles.css';

export const AuthContainer = ({ match, location }) => (
  <div className={styles.center}>
    <div className={styles.auth}>
      <div className={styles.switcher}>
        <NavLink
          to={`${match.url}/login`}
          className={styles.switcherElement}
          activeClassName={styles.switcherElementSelected}
        >
          Login
        </NavLink>
        <NavLink
          to="/auth/registration"
          className={styles.switcherElement}
          activeClassName={styles.switcherElementSelected}
        >
          Registration
        </NavLink>
        <div className={styles.switcherSlider}>
          <div
            className={
              styles.caret +
                ' ' +
                (location.pathname.endsWith('login')
                  ? styles.caretLeft
                  : styles.caretRight)
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
  </div>
);
