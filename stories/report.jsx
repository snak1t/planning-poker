import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import { Report } from '../src/Report/component';

const module = storiesOf('Report', module);

const game = {
  title: 'First agile Spring',
  description: `
Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum dignissimos reprehenderit impedit minima sunt temporibus quos laborum rem quasi accusantium nostrum possimus aut expedita consequuntur pariatur repellat, saepe sit eum.
  `
};

const stories = [
  {
    title: 'First one',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum dignissimos reprehenderit impedit minima sunt temporibu',
    score: 21
  },
  {
    title: 'Fifth',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum dignissimos reprehenderit impedit minima sunt temporibu',
    score: 55
  },
  {
    title: 'One more',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum dignissimos reprehenderit impedit minima sunt temporibu',
    score: 21
  }
];

module.add('Report', () => {
  return <Report game={game} stories={stories} />;
});
