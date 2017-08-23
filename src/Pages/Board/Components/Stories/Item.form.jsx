import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import './styles.css'
import { 
  Input,
  TextArea,
  Button 
} from '../../../../Shared/Components/Controls'

const CancelButton = Button.extend`
  border-color: #ff4747;
  color: #ff4747;
  &:hover {
    background-color: #ff4747;
    box-shadow: 0 0 2px 1px #ff4747;
  }
`

const SaveButton = Button.extend`
  border-color: #0060b3;
  color: #0060b3;
  &:hover {
    background-color: #0060b3;
    box-shadow: 0 0 2px 1px #0060b3;
  }
`

const RedactTitle = Input.extend`
  width: 100%;
`

const RedactDescription = TextArea.extend`
  width: 100%;
  resize: none;
  height: 70px;
`

export const ItemEdit = ({
  _id,
  title,
  description,
  setEditMode,
  updateStory
}) => {
  let textInput = null
  let descriptionInput = null

  const saveItem = (title, description) => {
    const data = {
      _id,
      title: textInput.value,
      description: descriptionInput.value
    }
    updateStory(data)
    setEditMode()
  }

  return (
    <article>
      <header className="Stories-storyHeader">
        <RedactTitle
          type="text"
          defaultValue={title}
          innerRef={input => (textInput = input)}
        />
      </header>
      <div className="Stories-storyDescription">
        <RedactDescription
          defaultValue={description}
          innerRef={input => (descriptionInput = input)}
        />
      </div>
      <footer className="Stories-storyFooter">
        <CancelButton onClick={setEditMode}>Cancel</CancelButton>
        <SaveButton onClick={() => saveItem(textInput, descriptionInput.value)}>Save</SaveButton>
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
