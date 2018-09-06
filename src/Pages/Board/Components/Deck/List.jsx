import React from 'react';
import PropTypes from 'prop-types';

import { Card } from './Card';
import { CardListScollable } from './atoms';

export const CardList = ({ deck, myScore, handleCardPick }) => {
    return (
        <CardListScollable>
            {deck.map((card, id) => (
                <Card key={`card${id}`} cardPicked={card.value === myScore} {...card} onClick={handleCardPick} />
            ))}
        </CardListScollable>
    );
};

CardList.propTypes = {
    deck: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        }),
    ),
    myScore: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    handleCardPick: PropTypes.func.isRequired,
};
