import React from 'react';
import PropTypes from 'prop-types';
import { Item } from './item';
import { ItemEdit } from './item.form';
import { connect } from 'react-redux';
import { updateStory, removeStory, emitCurrentStory } from './reducer';
import { withRouter } from 'react-router-dom';
import { evolve, always } from 'ramda';

export class StoryItem extends React.Component {
  state = {
    editMode: false
  };

  setEditMode(mode) {
    this.setState(evolve({ editMode: always(mode) }));
  }

  updateStory(story) {
    this.props.updateStory({
      login: this.props.match.params.user,
      gameID: this.props.match.params.gameID,
      story
    });
  }

  deleteStory(id) {
    this.props.deleteStory({
      login: this.props.match.params.user,
      gameID: this.props.match.params.gameID,
      storyID: id
    });
  }

  playStory(id) {
    this.props.setCurrentStory(id);
  }

  render() {
    const { onlyEdit = false, admin = false } = this.props;
    return this.state.editMode
      ? <ItemEdit
          {...this.props}
          setEditMode={() => this.setEditMode(false)}
          updateItem={values => this.updateStory(values)}
        />
      : <Item
          {...this.props}
          setEditMode={() => this.setEditMode(true)}
          deleteStory={id => this.deleteStory(id)}
          playStory={id => this.playStory(id)}
          onlyEdit={onlyEdit}
          showButtons={admin}
        />;
  }
}

StoryItem.propTypes = {
  title: PropTypes.string.isRequired,
  score: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  description: PropTypes.string,
  onlyEdit: PropTypes.bool,
  admin: PropTypes.bool,
  updateStory: PropTypes.func.isRequired,
  deleteStory: PropTypes.func.isRequired,
  setCurrentStory: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  updateStory: updateStory,
  deleteStory: removeStory,
  setCurrentStory: emitCurrentStory
};

export default withRouter(connect(null, mapDispatchToProps)(StoryItem));
