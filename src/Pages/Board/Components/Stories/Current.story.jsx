import React from 'react'
import PropTypes from 'prop-types'
import { CloseButton } from '../../../../Shared/Components/Controls'

import './styles.css'

export const CurrentStory = ({ title, score, description, onResetCurrent }) => {
  return (
    <article className="Stories-story">
      <header className="Stories-storyHeader" style={{ position: 'relative' }}>
        <h4 className="Stories-storyTitle">
          {title} {score !== 0 ? ` - ${score} sp` : ''}
        </h4>
        <CloseButton onClick={onResetCurrent} topRight />
      </header>
      <div className="Stories-storyDescription">
        {description}
      </div>
    </article>
  )
}

CurrentStory.propTypes = {
  title: PropTypes.string.isRequired,
  score: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  description: PropTypes.string,
  onResetCurrent: PropTypes.func.isRequired
}
