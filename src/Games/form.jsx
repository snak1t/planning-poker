import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal } from '../Modal/container';
import { saveGame } from './reducer';
import { Input, TextArea } from '../Controls/input';
import { FormGroup } from '../Controls/formgroup';
import { Label } from '../Controls/label';
import { Button } from '../Controls/Button';
import { RadioButton, RadioGroup } from '../Controls/Radio';

export const GameForm = ({ onClose, saveGame }) => {
  let description = null;
  let title = null;
  const onSubmit = e => {
    e.preventDefault();
    saveGame({
      title: title.value,
      description: description.value
    });
    onClose();
  };
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
  );
};

GameForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  saveGame: PropTypes.func
};

const mapDispatchToProps = {
  saveGame
};

export default connect(null, mapDispatchToProps)(GameForm);
