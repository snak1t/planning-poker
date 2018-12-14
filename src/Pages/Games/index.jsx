import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import not from 'ramda/src/not';
import { Icon, Button } from 'antd';

import './styles.css';
import GamesList from './Components/List';
import GameForm from './Components/Form';
import { GamesHeader } from './atoms';
import { QuickGame } from '../../components/Game/Quick.game';
import { AuthContext } from '../../Data/Auth/AuthContext';

const AddGameIcon = styled(Icon)`
    font-size: 1.4rem;
    cursor: pointer;
`;

export default function GamesContainer({ history }) {
    const { login, signOut } = useContext(AuthContext);
    const [modalWindow, setModalWindowVisibility] = useState(false);
    const navigateToGame = id => history.push(`/game/${login}/${id}`);
    const toggleModalWindow = () => setModalWindowVisibility(not);

    return (
        <div className="Games-container">
            {modalWindow ? <GameForm onClose={toggleModalWindow} /> : null}
            <GamesHeader>
                <h2>Your games</h2>

                <QuickGame />
                <Button onClick={signOut}>Sign out</Button>
                <AddGameIcon type="folder-add" onClick={toggleModalWindow} title="Add new game" />
            </GamesHeader>
            <GamesList onNavigateToTask={navigateToGame} />
        </div>
    );
}

GamesContainer.propTypes = {
    history: PropTypes.object.isRequired,
};
