import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  compose as composeHOC,
  withState,
  withHandlers,
  branch,
  renderComponent
} from 'recompose'

import { Item } from './Item'
import { ItemEdit } from './Item.form'
import {
  updateStory,
  removeStory,
  emitCurrentStory
} from '../../../../Data/Stories/reducer'

const mapStateToProps = state => ({
  currentStory: state.playSession.currentStory
})

const mapDispatchToProps = {
  updateStory,
  deleteStory: removeStory,
  setCurrentStory: emitCurrentStory
}

const withEditState = withState('editMode', 'toggleEdit', false)

const handlers = withHandlers({
  updateStory: ({ updateStory, match: { params } }) => story =>
    updateStory({
      login: params.user,
      gameID: params.gameID,
      story
    }),
  deleteStory: ({ deleteStory, match: { params } }) => id =>
    deleteStory({
      login: params.user,
      gameID: params.gameID,
      storyID: id
    }),
  setEditMode: ({ editMode, toggleEdit }) => () => toggleEdit(!editMode)
})

const enhancer = composeHOC(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withEditState,
  handlers,
  branch(({ editMode }) => editMode, renderComponent(ItemEdit))
)

export default enhancer(Item)
