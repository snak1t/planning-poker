import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import not from 'ramda/src/not';
import { Icon } from 'antd';

import './styles.css';
import GamesList from './Components/List';
import GameForm from './Components/Form';
import { GamesHeader } from './atoms';

export function GamesContainer({ history, userLogin }) {
    const [modalWindow, setModalWindowVisibility] = useState(false);
    const navigateToGame = id => history.push(`/game/${userLogin}/${id}`);
    const toggleModalWindow = () => setModalWindowVisibility(not);

    return (
        <div className="Games-container">
            {modalWindow ? <GameForm onClose={toggleModalWindow} /> : null}
            <GamesHeader>
                <h2>Your games</h2>
                <Icon type="folder-add" style={{ fontSize: '1.4rem', cursor: 'pointer' }} onClick={toggleModalWindow} title="Add new game" />
            </GamesHeader>
            <GamesList onNavigateToTask={navigateToGame} />
        </div>
    );
}

GamesContainer.propTypes = {
    history: PropTypes.object.isRequired,
    userLogin: PropTypes.string,
};

const mapStateToProps = state => ({
    userLogin: state.user.login,
});

const enhancer = connect(mapStateToProps);

export default enhancer(GamesContainer);
