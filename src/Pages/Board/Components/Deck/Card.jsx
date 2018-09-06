import React from 'react';
import PropTypes from 'prop-types';
import { Card as SCard } from './atoms';

export const Card = ({ value, onClick = () => {}, cardPicked, back = false, name }) => {
    const displayedValue =
        typeof value === 'string' ? /^\w/.test(value) ? <span className={`fa fa-${value}`} /> : value : value;
    return (
        <SCard.Container onClick={() => onClick(value)} cardPicked={cardPicked} back={back}>
            <SCard.InnerContainer>
                <SCard.Left back={back}>{displayedValue}</SCard.Left>
                <SCard.Center back={back}>
                    <span>{displayedValue}</span>
                    {name && <span className="userName">{name}</span>}
                </SCard.Center>
                <SCard.Right back={back}>{displayedValue}</SCard.Right>
            </SCard.InnerContainer>
        </SCard.Container>
    );
};

Card.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onClick: PropTypes.func,
    cardPicked: PropTypes.bool,
    back: PropTypes.bool,
    name: PropTypes.string,
};
