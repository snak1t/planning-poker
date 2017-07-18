import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../Controls/Button';
import styled from 'styled-components';

const Box = styled.div`
  margin: 1rem 0;
  padding: 1rem;
  display: flex;
  justify-content: space-around;
  background-color: #fff;
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.15);
`;

export const TableButtons = ({
  completed,
  reveal,
  onStartToPlay,
  onRevealCards,
  onResetCurrent,
  onAcceptScore
}) => {
  return (
    <Box>
      {completed
        ? null
        : <Button outline onClick={onStartToPlay}>
            Start the turn
          </Button>}

      {completed && !reveal
        ? <Button outline onClick={onRevealCards}>
            Reveal Cards
          </Button>
        : null}

      {reveal
        ? <Button outline onClick={onResetCurrent}>
            Reset Bids
          </Button>
        : null}
      {reveal
        ? <Button outline onClick={onAcceptScore}>
            Accept Score
          </Button>
        : null}
    </Box>
  );
};

TableButtons.propTypes = {
  completed: PropTypes.bool.isRequired,
  reveal: PropTypes.bool.isRequired,
  onStartToPlay: PropTypes.func.isRequired,
  onRevealCards: PropTypes.func.isRequired,
  onResetCurrent: PropTypes.func.isRequired,
  onAcceptScore: PropTypes.func.isRequired
};
