import React from 'react';
import PropTypes from 'prop-types';
import {
  map,
  partition,
  propEq,
  length,
  equals,
  always,
  curry,
  ifElse,
  __,
  compose
} from 'ramda';
import StoryItem from './item.container';
import './styles.css';
import { storyType } from './type.js';
import ReportContainer from '../Report/container';

const separateStoriesByActivity = partition(propEq('active', false));
const renderNothing = always(null);
const baseRender = ifElse(compose(equals(0), length), renderNothing, __);

export const StoryList = ({ stories, admin }) => {
  const renderItem = map(story => {
    return <StoryItem admin={admin} key={story._id} {...story} />;
  });

  const renderItems = curry((title, stories) =>
    <div>
      <span className="Stories-listHeader">
        {title}
      </span>
      {renderItem(stories)}
    </div>
  );
  const renderUnplayedStories = baseRender(renderItems('Stories To Play'));
  const renderPlayedStories = baseRender(renderItems('Played Stories'));

  const [unplayedStories, playedStories] = separateStoriesByActivity(stories);

  return (
    <div className="Stories-stories">
      {length(unplayedStories) === 0
        ? <ReportContainer />
        : renderUnplayedStories(unplayedStories)}
      {renderPlayedStories(playedStories)}
    </div>
  );
};

StoryList.propTypes = {
  stories: PropTypes.arrayOf(storyType),
  admin: PropTypes.bool.isRequired
};
