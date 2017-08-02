import React from 'react'
import PropTypes from 'prop-types'
import map from 'ramda/src/map'
import partition from 'ramda/src/partition'
import propEq from 'ramda/src/propEq'
import length from 'ramda/src/length'
import equals from 'ramda/src/equals'
import always from 'ramda/src/always'
import curry from 'ramda/src/curry'
import ifElse from 'ramda/src/ifElse'
import __ from 'ramda/src/__'
import compose from 'ramda/src/compose'

import StoryItem from './Item.container'
import ReportContainer from '../Report/Container'
import './styles.css'
import { storyType } from '../../../../Data/Stories/type'

const separateStoriesByActivity = partition(propEq('active', false))
const renderNothing = always(null)
const baseRender = ifElse(compose(equals(0), length), renderNothing, __)

export const StoryList = ({ stories, admin }) => {
  const renderItem = map(story => {
    return <StoryItem admin={admin} key={story._id} {...story} />
  })

  const renderItems = curry((title, stories) =>
    <div>
      <span className="Stories-listHeader">
        {title}
      </span>
      {renderItem(stories)}
    </div>
  )
  const renderUnplayedStories = baseRender(renderItems('Stories To Play'))
  const renderPlayedStories = baseRender(renderItems('Played Stories'))

  const [unplayedStories, playedStories] = separateStoriesByActivity(stories)

  return (
    <div className="Stories-stories">
      {length(unplayedStories) === 0
        ? <ReportContainer />
        : renderUnplayedStories(unplayedStories)}
      {renderPlayedStories(playedStories)}
    </div>
  )
}

StoryList.propTypes = {
  stories: PropTypes.arrayOf(storyType),
  admin: PropTypes.bool.isRequired
}
