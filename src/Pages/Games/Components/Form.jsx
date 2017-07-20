import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Modal } from '../../../Shared/Components/Modal/Container'
import { Input, TextArea } from '../../../Shared/Components/Controls/Input'
import { FormGroup } from '../../../Shared/Components/Controls/Form.group'
import { Label } from '../../../Shared/Components/Controls/Label'
import { Button } from '../../../Shared/Components/Controls/Button'
import {
  RadioButton,
  RadioGroup
} from '../../../Shared/Components/Controls/Radio'
import { saveGame } from '../../../Data/Games/reducer.js'

export const GameForm = ({ onClose, saveGame }) => {
  let description = null
  let title = null
  const onSubmit = e => {
    e.preventDefault()
    saveGame({
      title: title.value,
      description: description.value
    })
    onClose()
  }
  return (
    <Modal title="Create new game" onClose={onClose}>
      <form onSubmit={onSubmit}>
        <FormGroup>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            innerRef={input => (title = input)}
            type="text"
            placeholder="New game title"
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="description">Description</Label>
          <TextArea
            id="description"
            name="description"
            innerRef={input => (description = input)}
            placeholder="Optional game description"
          />
        </FormGroup>
        <FormGroup>
          <RadioGroup
            name="typeOfDeck"
            onChange={e => console.log(e.target.value)}
          >
            <RadioButton value="fibbo" label="Fibbonacci" />
            <RadioButton value="sizes" label="Sizes" />
          </RadioGroup>
        </FormGroup>
        <FormGroup>
          <Button primary type="submit">
            Add
          </Button>
        </FormGroup>
      </form>
    </Modal>
  )
}

GameForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  saveGame: PropTypes.func
}

const mapDispatchToProps = {
  saveGame
}

export default connect(null, mapDispatchToProps)(GameForm)
