import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import socketConst from '../../../../socket.constants.js';
import { CardList } from './List';
import { CardListWrapper } from './atoms';
import { AuthContext } from '../../../../Data/Auth/AuthContext.js';

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

export function DeckContainer({ setScore }) {
    const user = useContext(AuthContext);
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
};

const mapDispatchToProps = dispatch => ({
    setScore: payload =>
        dispatch({
            type: socketConst.SEND_SCORE,
            payload,
        }),
});

export default connect(
    null,
    mapDispatchToProps,
)(DeckContainer);
