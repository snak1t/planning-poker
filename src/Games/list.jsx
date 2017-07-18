import React from 'react';
import { connect } from 'react-redux';
import { map, addIndex } from 'ramda';
import styles from './styles.css';
import { GameItem } from './item';
import { deleteGame } from './reducer';

const indexedMap = addIndex(map);

export const GamesList = ({ games, onNavigateToTask, deleteGame }) => {
  const displayGamesList = indexedMap((game, idx) => {
    return (
      <GameItem
        key={idx}
        {...game}
        onNavigateToTask={onNavigateToTask}
        onDeleteGame={gameID => deleteGame({ gameID })}
      />
    );
  });
  return (
    <section className={styles.list}>
      {games.length === 0 ? 'No games yet' : displayGamesList(games)}
    </section>
  );
};

const mapStateToProps = state => ({
  games: state.games
});

const mapDispatchToProps = { deleteGame };

export default connect(mapStateToProps, mapDispatchToProps)(GamesList);
