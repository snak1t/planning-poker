import React from 'react'
import PropTypes from 'prop-types'

import { Button } from '../../../../Shared/Components/Controls'
import './styles.css'

export const Item = ({
  _id,
  title,
  score,
  description,
  setEditMode,
  deleteStory,
  setCurrentStory,
  currentStory,
  admin
}) => {
  const isCurrentStory = currentStory === _id
  return (
    <article className="Stories-story">
      <header className="Stories-storyHeader">
        <h4 className="Stories-storyTitle">
          {title} {score !== 0 ? ` - ${score} sp` : ''}
        </h4>
      </header>
      <div className="Stories-storyDescription">
        {description}
      </div>
      {admin
        ? <footer className="Stories-storyFooter">
            <Button small outline onClick={setEditMode}>
              Edit Story
            </Button>
            {isCurrentStory
              ? null
              : <Button small outline onClick={() => setCurrentStory(_id)}>
                  Play Story
                </Button>}
            {isCurrentStory
              ? null
              : <Button small outline onClick={() => deleteStory(_id)}>
                  Delete Story
                </Button>}
          </footer>
        : null}
    </article>
  )
}

Item.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  score: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  description: PropTypes.string,
  setEditMode: PropTypes.func.isRequired,
  deleteStory: PropTypes.func.isRequired,
  admin: PropTypes.bool
}
