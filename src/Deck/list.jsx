import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card } from './card';

const Container = styled.div`
  display: flex;
  width: 100%;
`;

export const CardList = ({ deck, myScore, handleCardPick }) => {
  return (
    <Container>
      {deck.map((card, id) =>
        <Card
          key={`card${id}`}
          cardPicked={card.value === myScore}
          {...card}
          onClick={handleCardPick}
        />
      )}
    </Container>
  );
};

CardList.propTypes = {
  deck: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
  ),
  myScore: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleCardPick: PropTypes.func.isRequired
};
