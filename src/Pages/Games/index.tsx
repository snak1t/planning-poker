import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { not } from 'ramda';
import { Icon, Button } from 'antd';

import './styles.css';
import { GamesList } from './Components/List';
import { GameForm } from './Components/Form';
import { GamesHeader } from './atoms';
import { QuickGame } from '../../components/Game/Quick.game';
import { AuthContext } from '../../Data/Auth/AuthContext';
import { RouteComponentProps } from 'react-router';

const AddGameIcon = styled(Icon)`
    font-size: 1.4rem;
    cursor: pointer;
`;

const GamesContainer: React.SFC<RouteComponentProps> = () => {
    const { logout } = useContext(AuthContext);
    const [modalWindow, setModalWindowVisibility] = useState(false);
    const toggleModalWindow = () => setModalWindowVisibility(not);

    return (
        <div className="Games-container">
            {modalWindow ? <GameForm onClose={toggleModalWindow} /> : null}
            <GamesHeader>
                <h2>Your games</h2>
                <QuickGame />
                <Button onClick={logout}>Sign out</Button>
                <AddGameIcon type="folder-add" onClick={toggleModalWindow} title="Add new game" />
            </GamesHeader>
            <GamesList />
        </div>
    );
};

export default GamesContainer;
