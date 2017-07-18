import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import socketConst from '../socket.constants.js';
import { CardList } from './list';
import { evolve, always } from 'ramda';

const setScoreToNull = evolve({ myScore: always(null) });

export class DeckContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: [
        { value: 1 },
        { value: 2 },
        { value: 3 },
        { value: 5 },
        { value: 8 },
        { value: 13 },
        { value: 21 },
        { value: 34 },
        { value: 55 },
        { value: 89 },
        { value: 'question' },
        { value: '\u221e' },
        { value: 'coffee' }
      ],
      myScore: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isPlaying === false) {
      this.setState(setScoreToNull);
    }
  }

  sendBid() {
    const data = Object.assign({}, this.props.user, {
      score: this.textInput.value
    });
    this.props.setScore(data);
  }

  handleCardPick(score) {
    const data = Object.assign({}, this.props.user, {
      score
    });
    this.setState(() => ({ myScore: score }));
    this.props.setScore(data);
  }

  render() {
    return (
      <section>
        {this.props.isPlaying &&
          <CardList
            deck={this.state.deck}
            myScore={this.state.myScore}
            handleCardPick={value => this.handleCardPick(value)}
          />}
      </section>
    );
  }
}

DeckContainer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  setScore: PropTypes.func.isRequired,
  user: PropTypes.shape({
    login: PropTypes.string
  })
};

const mapStateToProps = state => ({
  user: state.user,
  isPlaying: state.players.readyToPlay
});

const mapDispatchToProps = dispatch => ({
  setScore: payload =>
    dispatch({
      type: socketConst.SEND_SCORE,
      payload
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckContainer);
