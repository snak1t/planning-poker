import React from 'react';
import { connect } from 'react-redux';
import map from 'ramda/src/map';
import '../styles.css';
import { GameItem } from './Item';
import { deleteGame } from '../../../Data/Games/reducer';
import { GamesGrid, GameGridItem } from '../atoms';

export const GamesList = ({ games, onNavigateToTask, deleteGame }) => {
    const displayGamesList = map(game => {
        const { _id } = game;
        return (
            <GameGridItem key={_id}>
                <GameItem
                    game={game}
                    onPlayGame={() => onNavigateToTask(_id)}
                    onDeleteGame={() => deleteGame({ gameID: _id })}
                />
            </GameGridItem>
        );
    });
    return <GamesGrid>{games.length === 0 ? 'No games yet' : displayGamesList(games)}</GamesGrid>;
};

const mapStateToProps = state => ({
    games: state.games,
});

const mapDispatchToProps = { deleteGame };

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(GamesList);
