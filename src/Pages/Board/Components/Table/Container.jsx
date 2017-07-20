import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import merge from 'ramda/src/merge'
import { withRouter } from 'react-router-dom'

import {
  isGameCompleted,
  calculateScore,
  getScores
} from '../../../../Data/PlaySession/reducer'

import { storyType } from '../../../../Data/Stories/type'

// Elements
import { Card } from '../Deck/Card'
import { TableButtons } from './ButtonBar'
import StoryItem from '../Stories/Item.container'
// Actions
import { getCurrentStory } from '../../../../Data/Stories/reducer'
import { updateStory, selectNextStory } from '../../../../Data/Stories/reducer'
import {
  emitResetBids,
  emitReadyToPlay,
  showPlayedCards
} from '../../../../Data/PlaySession/reducer'

export class TableContainer extends React.Component {
  acceptScore = () => {
    const score = this.props.averageScore
    const story = merge(this.props.story, {
      active: true,
      score
    })
    this.props.updateStory({
      login: this.props.match.params.user,
      gameID: this.props.match.params.gameID,
      story
    })
    this.props.setNextStory()
    this.props.startToPlay(false)
  }

  resetCurrent = () => this.props.resetBids()

  revealCards = () => this.props.showPlayedCards()

  startToPlay = () => this.props.startToPlay(true)

  render() {
    const { players, story } = this.props
    if (!story) return null
    return (
      <section>
        {/*Current Story*/}
        <StoryItem onlyEdit={true} {...story} />
        {this.props.admin
          ? <TableButtons
              completed={this.props.completed}
              reveal={this.props.revealCards}
              onStartToPlay={this.startToPlay}
              onRevealCards={this.revealCards}
              onResetCurrent={this.resetCurrent}
              onAcceptScore={this.acceptScore}
            />
          : null}
        {this.props.revealCards
          ? <h1>
              Average Score is {this.props.averageScore}
            </h1>
          : null}

        {/*Players */}
        <div style={{ display: 'flex', height: '200px' }}>
          {players.map(
            (p, id) =>
              p.score !== null
                ? <Card
                    key={id}
                    value={p.score}
                    name={p.user}
                    back={!this.props.revealCards}
                  />
                : undefined
          )}
        </div>
      </section>
    )
  }
}

TableContainer.propTypes = {
  players: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.string.isRequired,
      score: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    })
  ),
  story: storyType,
  admin: PropTypes.bool.isRequired,
  revealCards: PropTypes.bool.isRequired,
  updateStory: PropTypes.func.isRequired,
  setNextStory: PropTypes.func.isRequired,
  resetBids: PropTypes.func.isRequired,
  startToPlay: PropTypes.func.isRequired,
  showPlayedCards: PropTypes.func.isRequired
}

const mapStateToProps = store => ({
  players: getScores(store),
  story: getCurrentStory(store),
  revealCards: store.playSession.isRevealing,
  completed: isGameCompleted(store),
  averageScore: calculateScore(store)
})

const mapDispatchToProps = {
  updateStory: updateStory,
  setNextStory: selectNextStory,
  resetBids: emitResetBids,
  startToPlay: emitReadyToPlay,
  showPlayedCards
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TableContainer)
)
