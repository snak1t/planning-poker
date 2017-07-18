import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Link from '../src/Controls/NavLink';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const module = storiesOf('Links from router', module);

module.add('Simple Links', () => {
  return (
    <Router>
      <Link to="/">Simple link</Link>
      {/*<Route exact path*/}
    </Router>
  );
});
