import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { evolve, always } from 'ramda'

import { StoriesForm } from './form'
import { saveStory, getAllStories } from './reducer'
import { StoryList } from './list'
import './styles.css'
import { storyType } from './type.js'

export class StoriesContainer extends React.Component {
  state = {
    addMode: false
  }

  toggleAddMode = currentMode =>
    this.setState(evolve({ addMode: always(!currentMode) }))

  addStory = titles =>
    this.props.saveStory({
      all: titles,
      gameID: this.props.match.params.gameID
    })

  render() {
    return (
      <section className="Stories-container">
        <header className="Stories-header">
          <h3 className="Stories-title">Stories</h3>
        </header>
        <StoryList stories={this.props.stories} admin={this.props.admin} />
        <StoriesForm
          handleSubmit={this.addStory}
          toggleMode={this.toggleAddMode}
          isAdmin={this.props.admin}
          mode={this.state.addMode}
        />
      </section>
    )
  }
}

StoriesContainer.propTypes = {
  stories: PropTypes.arrayOf(storyType),
  admin: PropTypes.bool.isRequired,
  saveStory: PropTypes.func.isRequired
}

const mapStateToProps = store => ({
  stories: getAllStories(store)
})

const mapDispatchToProps = {
  saveStory
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(StoriesContainer)
)
