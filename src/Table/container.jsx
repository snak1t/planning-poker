import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { merge, __ } from 'ramda';
import { withRouter } from 'react-router-dom';

import { storyType } from '../Stories/type.js';

// Elements
import { Card } from '../Deck/card';
import { TableButtons } from './buttonBar';
import StoryItem from '../Stories/item.container';
// Actions
import { getCurrentStory } from '../Stories/reducer';
import { updateStory, selectNextStory } from '../Stories/reducer';
import { calculateAverage } from '../utils/average.score.js';
import {
  emitResetBids,
  emitReadyToPlay,
  showPlayedCards
} from '../Player/reducer';

const resetToDefault = merge(__, {
  completed: false,
  score: 0
});

export class TableContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: false,
      score: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    const unvotedPlayers = nextProps.players.filter(p => p.score === null);
    if (nextProps.players.length !== 0 && unvotedPlayers.length === 0) {
      this.setState(prevState => ({
        completed: true,
        score: calculateAverage(nextProps.players)
      }));
    } else {
      this.setState(resetToDefault);
    }
  }

  acceptScore() {
    const score = this.state.score;
    const story = merge(this.props.story, {
      active: true,
      score
    });
    this.props.updateStory({
      login: this.props.match.params.user,
      gameID: this.props.match.params.gameID,
      story
    });
    this.props.setNextStory();
    this.props.startToPlay(false);
  }

  resetCurrent() {
    this.props.resetBids();
  }

  revealCards() {
    this.props.showPlayedCards();
  }

  startToPlay() {
    this.props.startToPlay(true);
  }

  render() {
    const { players, story } = this.props;
    if (!story) return null;
    return (
      <section>
        {/*Current Story*/}
        <StoryItem onlyEdit={true} {...story} />
        {this.props.admin
          ? <TableButtons
              completed={this.state.completed}
              reveal={this.props.revealCards}
              onStartToPlay={() => this.startToPlay()}
              onRevealCards={() => this.revealCards()}
              onResetCurrent={() => this.resetCurrent()}
              onAcceptScore={() => this.acceptScore()}
            />
          : null}
        {this.props.revealCards
          ? <h1>
              Average Score is {this.state.score}
            </h1>
          : null}

        {/*Players */}
        <div style={{ display: 'flex', height: '200px' }}>
          {players.map((p, id) => {
            if (p.score !== null) {
              return (
                <Card
                  key={id}
                  value={p.score}
                  name={p.login}
                  back={!this.props.revealCards}
                />
              );
            }
          })}
        </div>
      </section>
    );
  }
}

TableContainer.propTypes = {
  players: PropTypes.arrayOf(
    PropTypes.shape({
      login: PropTypes.string.isRequired,
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
};

const mapStateToProps = state => ({
  players: state.players.all,
  story: getCurrentStory(state.stories),
  revealCards: state.players.revealCards
});

const mapDispatchToProps = {
  updateStory: updateStory,
  setNextStory: selectNextStory,
  resetBids: emitResetBids,
  startToPlay: emitReadyToPlay,
  showPlayedCards
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TableContainer)
);
