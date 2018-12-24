import React from 'react';
import '../styles.css';
import { Card, Icon } from 'antd';

export const GameItem = ({ game, onPlayGame, onDeleteGame }) => {
    return (
        <Card
            style={{ margin: '0.4rem' }}
            title={game.title}
            actions={[<Icon type="play-circle" onClick={onPlayGame} />, <Icon type="delete" onClick={onDeleteGame} />]}
        >
            {game.description}
        </Card>
    );
};
