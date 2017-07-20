import React from 'react'
import PropTypes from 'prop-types'

import { Button } from '../../../../Shared/Components/Controls/Button'
import './styles.css'

export const Item = ({
  _id,
  title,
  score,
  description,
  setEditMode,
  deleteStory,
  playStory,
  onlyEdit,
  admin
}) => {
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
      {admin &&
        <footer className="Stories-storyFooter">
          <Button small outline onClick={setEditMode}>
            Edit Story
          </Button>
          {onlyEdit
            ? null
            : <Button small outline onClick={() => playStory(_id)}>
                Play Story
              </Button>}
          {onlyEdit
            ? null
            : <Button small outline onClick={() => deleteStory(_id)}>
                Delete Story
              </Button>}
        </footer>}
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
  playStory: PropTypes.func.isRequired,
  onlyEdit: PropTypes.bool,
  admin: PropTypes.bool
}
