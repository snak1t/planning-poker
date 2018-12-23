import React, { useState, useContext } from 'react';

import * as Atoms from './atoms';

import { AuthContext } from '../../../../Data/Auth/AuthContext';
import { PlayRoomContext, setScore } from '../../../../Data/PlaySession/PlayRoomContext';
import { Score, DECK } from './deck';
import { Card } from './Card';

type TempUser = {
    user: {
        info: {
            name: string;
            picture: string;
        };
    };
};

export function DeckContainer() {
    const { user } = useContext(AuthContext) as TempUser;
    const { dispatch } = useContext(PlayRoomContext);
    const [myScore, setMyScore] = useState<Score | null>(null);
    const handleCardPick = (score: Score) => {
        setMyScore(score);
        dispatch(setScore({ user: user.info.name, avatar: user.info.picture, score }));
    };
    return (
        <Atoms.CardListContainer>
            {DECK.map((card, id) => (
                <Card key={`card${id}`} cardPicked={card.value === myScore} {...card} onClick={handleCardPick} />
            ))}
        </Atoms.CardListContainer>
    );
}
