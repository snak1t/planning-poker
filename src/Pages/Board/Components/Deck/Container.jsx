import React, { useState, useContext } from 'react';
import { CardList } from './List';
import { CardListWrapper } from './atoms';
import { AuthContext } from '../../../../Data/Auth/AuthContext.js';
import { PlayRoomContext, setScore } from '../../../../Data/PlaySession/PlayRoomContext.js';

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

export function DeckContainer() {
    const user = useContext(AuthContext);
    const { dispatch } = useContext(PlayRoomContext);
    const [myScore, setMyScore] = useState(null);
    const handleCardPick = score => {
        setMyScore(score);
        dispatch(setScore({ ...user, score }));
    };
    return (
        <CardListWrapper>
            <CardList deck={DECK} myScore={myScore} handleCardPick={handleCardPick} />
        </CardListWrapper>
    );
}
