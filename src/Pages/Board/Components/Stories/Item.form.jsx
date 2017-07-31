import React from 'react'
import PropTypes from 'prop-types'
import './styles.css'

export const ItemEdit = ({
  _id,
  title,
  description,
  setEditMode,
  updateStory
}) => {
  let titleInput = null
  let descriptionInput = null

  const saveItem = () => {
    const data = {
      _id,
      title: titleInput.value,
      description: descriptionInput.value
    }
    updateStory(data)
    setEditMode()
  }

  return (
    <article>
      <header className="Stories-storyHeader">
        <input
          type="text"
          defaultValue={title}
          ref={input => (titleInput = input)}
        />
      </header>
      <div className="Stories-storyDescription">
        <textarea
          defaultValue={description}
          ref={input => (descriptionInput = input)}
        />
      </div>
      <footer className="Stories-storyFooter">
        <button onClick={setEditMode}>Cancel</button>
        <button onClick={() => saveItem()}>Save</button>
      </footer>
    </article>
  )
}

ItemEdit.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  setEditMode: PropTypes.func.isRequired,
  updateStory: PropTypes.func.isRequired
}
