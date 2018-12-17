import React, { useContext } from 'react';
import map from 'ramda/src/map';
import '../styles.css';
import { GameItem } from './Item';
import { GamesGrid, GameGridItem } from '../atoms';
import { GamesContext } from '../../../Data/Games/GamesContext';

export function GamesList({ onPlayGame }) {
    const { games, removeGame } = useContext(GamesContext);
    const displayGamesList = map(game => {
        const { _id } = game;
        return (
            <GameGridItem key={_id}>
                <GameItem game={game} onPlayGame={() => onPlayGame(_id)} onDeleteGame={() => removeGame(_id)} />
            </GameGridItem>
        );
    });
    return <GamesGrid>{games.length === 0 ? 'No games yet' : displayGamesList(games)}</GamesGrid>;
}
