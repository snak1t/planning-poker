import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import socketConst from '../../../../socket.constants.js';
import { CardList } from './List';
import { CardListWrapper } from './atoms';

export class DeckContainer extends React.Component {
    state = {
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
            { value: 'coffee' },
        ],
        myScore: null,
    };
    static getDerivedStateFromProps(nextProps) {
        if (nextProps.isPlaying === false) {
            return {
                myScore: null,
            };
        }
        return null;
    }

    sendBid() {
        const data = Object.assign({}, this.props.user, {
            score: this.textInput.value,
        });
        this.props.setScore(data);
    }

    handleCardPick = score => {
        const data = Object.assign({}, this.props.user, {
            score,
        });
        this.setState(() => ({ myScore: score }));
        this.props.setScore(data);
    };

    render() {
        if (!this.props.isPlaying) {
            return null;
        }
        return (
            <CardListWrapper>
                <CardList deck={this.state.deck} myScore={this.state.myScore} handleCardPick={this.handleCardPick} />
            </CardListWrapper>
        );
    }
}

DeckContainer.propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    setScore: PropTypes.func.isRequired,
    user: PropTypes.shape({
        login: PropTypes.string,
    }),
};

const mapStateToProps = state => ({
    user: state.user,
    isPlaying: state.playSession.isPlaying,
});

const mapDispatchToProps = dispatch => ({
    setScore: payload =>
        dispatch({
            type: socketConst.SEND_SCORE,
            payload,
        }),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(DeckContainer);
