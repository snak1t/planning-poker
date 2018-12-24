import React, { useState, useContext } from 'react';

import * as Atoms from './atoms';

import { AuthContext } from '../../../../Data/Auth/AuthContext';
import { PlayRoomContext } from '../../../../Data/PlaySession/PlayRoomContext';
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
    const { actions } = useContext(PlayRoomContext);
    const [myScore, setMyScore] = useState<Score | null>(null);
    const handleCardPick = (score: Score) => {
        setMyScore(score);
        actions.setPlayerScore({
            info: {
                login: user.info.name,
                picture: user.info.picture,
            },
            score,
            id: `temp__${Math.random() * 100}`,
        });
    };
    return (
        <Atoms.CardListContainer>
            {DECK.map((card, id) => (
                <Card key={`card${id}`} cardPicked={card.value === myScore} {...card} onClick={handleCardPick} />
            ))}
        </Atoms.CardListContainer>
    );
}
