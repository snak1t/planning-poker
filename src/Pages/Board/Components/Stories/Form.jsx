import React from 'react'
import PropTypes from 'prop-types'
import {
  TextArea,
  FormGroup,
  Button
} from '../../../../Shared/Components/Controls'
import split from 'ramda/src/split'
import map from 'ramda/src/map'

export const StoriesForm = ({ handleSubmit, toggleMode, mode, isAdmin }) => {
  let textInput = null

  const handleKeyPress = event => {
    if (event.charCode === 13 && !event.shiftKey) {
      event.preventDefault();
      const allTasks = map(
        item => ({ title: item }),
        split('\n', textInput.value)
      )
      handleSubmit(allTasks)
      toggleMode(mode)
      return (textInput.value = '')
    }
  }

  if (!isAdmin) return null

  return (
    <div>
      {mode
        ? <FormGroup>
            <TextArea
              type="text"
              placeholder="Story title"
              innerRef={input => (textInput = input)}
              onKeyPress={e => handleKeyPress(e)}
            />
          </FormGroup>
        : <FormGroup>
            <Button onClick={() => toggleMode(mode)}> Add new Story</Button>
          </FormGroup>}
    </div>
  )
}

StoriesForm.propTypes = {
  mode: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  toggleMode: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}
