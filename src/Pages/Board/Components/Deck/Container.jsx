import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import socketConst from '../../../../socket.constants.js';
import { CardList } from './List';
import { CardListWrapper } from './atoms';

const DECK = [
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
];

export function DeckContainer({ user, setScore }) {
    const [myScore, setMyScore] = useState(null);
    const handleCardPick = score => {
        setMyScore(score);
        setScore({ ...user, score });
    };
    return (
        <CardListWrapper>
            <CardList deck={DECK} myScore={myScore} handleCardPick={handleCardPick} />
        </CardListWrapper>
    );
}

DeckContainer.propTypes = {
    setScore: PropTypes.func.isRequired,
    user: PropTypes.shape({
        login: PropTypes.string,
    }),
};

const mapStateToProps = state => ({
    user: state.user,
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
