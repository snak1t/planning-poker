import React from 'react';
import { connect } from 'react-redux';
import map from 'ramda/src/map';
import addIndex from 'ramda/src/addIndex';
import '../styles.css';
import { GameItem } from './Item';
import { deleteGame } from '../../../Data/Games/reducer';
import { Row, Col } from 'antd';

const indexedMap = addIndex(map);

export const GamesList = ({ games, onNavigateToTask, deleteGame }) => {
    const displayGamesList = indexedMap((game, idx) => {
        return (
            <Col key={idx} span={8}>
                <GameItem
                    {...game}
                    onNavigateToTask={onNavigateToTask}
                    onDeleteGame={gameID => deleteGame({ gameID })}
                />
            </Col>
        );
    });
    return (
        <Row gutter={16}>
            {games.length === 0 ? 'No games yet' : displayGamesList(games)}
        </Row>
    );
};

const mapStateToProps = state => ({
    games: state.games,
});

const mapDispatchToProps = { deleteGame };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GamesList);
