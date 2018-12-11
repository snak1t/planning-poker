import React from 'react';
import { connect } from 'react-redux';
import map from 'ramda/src/map';
import '../styles.css';
import { GameItem } from './Item';
import { deleteGame } from '../../../Data/Games/reducer';
import { Row, Col } from 'antd';

export const GamesList = ({ games, onNavigateToTask, deleteGame }) => {
    const displayGamesList = map(game => {
        const { _id } = game;
        return (
            <Col key={_id} span={8}>
                <GameItem
                    game={game}
                    onPlayGame={() => onNavigateToTask(_id)}
                    onDeleteGame={() => deleteGame({ gameID: _id })}
                />
            </Col>
        );
    });
    return <Row gutter={16}>{games.length === 0 ? 'No games yet' : displayGamesList(games)}</Row>;
};

const mapStateToProps = state => ({
    games: state.games,
});

const mapDispatchToProps = { deleteGame };

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(GamesList);
