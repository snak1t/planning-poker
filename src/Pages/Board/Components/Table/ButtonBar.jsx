import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

export const TableButtons = ({ completed, reveal, onStartToPlay, onRevealCards, onResetCurrent, onAcceptScore }) => {
    return (
        <Button.Group>
            {completed ? null : <Button onClick={onStartToPlay}>Start the turn</Button>}
            {completed && !reveal ? <Button onClick={onRevealCards}>Reveal Cards</Button> : null}
            {reveal ? <Button onClick={onResetCurrent}>Reset Bids</Button> : null}
            {reveal ? <Button onClick={onAcceptScore}>Accept Score</Button> : null}
        </Button.Group>
    );
};

TableButtons.propTypes = {
    completed: PropTypes.bool.isRequired,
    reveal: PropTypes.bool.isRequired,
    onStartToPlay: PropTypes.func.isRequired,
    onRevealCards: PropTypes.func.isRequired,
    onResetCurrent: PropTypes.func.isRequired,
    onAcceptScore: PropTypes.func.isRequired,
};
