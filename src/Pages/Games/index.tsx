import React, { useState, useContext } from 'react';
import { not } from 'ramda';
import { Button } from 'antd';

import { GamesList } from './Components/List';
import { GameForm } from './Components/Form';
import * as Atoms from './atoms';
import { QuickGame } from '../../components/QuickGame';
import { AuthContext } from '../../Data/Auth/AuthContext';
import { RouteComponentProps } from 'react-router';
import { FloatButtonsContainer } from '../../components/FloatButtonsContainer/FloatButtonsContainer';

const GamesContainer: React.SFC<RouteComponentProps> = () => {
    const { logout } = useContext(AuthContext);
    const [modalWindow, setModalWindowVisibility] = useState(false);
    const toggleModalWindow = () => setModalWindowVisibility(not);

    return (
        <>
            {modalWindow ? <GameForm onClose={toggleModalWindow} /> : null}
            <Atoms.GamesHeader>
                <h2>Your games</h2>
                <QuickGame />
                <Button onClick={logout}>Sign out</Button>
            </Atoms.GamesHeader>
            <GamesList />
            <FloatButtonsContainer>
                <Button onClick={toggleModalWindow} type="primary" shape="circle" icon="plus" size="large" />
            </FloatButtonsContainer>
        </>
    );
};

export default GamesContainer;
