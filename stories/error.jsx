import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import { ErrorComponent } from '../src/Error/component';

const module = storiesOf('Error Component', module);

module.add('Simple Error', () => {
  return <ErrorComponent error="User with this credentials wasnt found" />;
});
