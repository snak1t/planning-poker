import React, { useState } from 'react';
import { not } from 'ramda';
import { Button } from 'antd';

import { GamesContainer } from './Components/GamesContainer/GamesContainer';
import { GameAddForm } from './Components/GameAddForm/GameAddForm';
import * as Atoms from './atoms';
import { QuickGame } from '../../components/QuickGame';
import { RouteComponentProps } from 'react-router';
import { FloatButtonsContainer } from '../../components/FloatButtonsContainer/FloatButtonsContainer';

const GamesPage: React.SFC<RouteComponentProps> = () => {
    const [modalWindow, setModalWindowVisibility] = useState(false);
    const toggleModalWindow = () => setModalWindowVisibility(not);

    return (
        <>
            {modalWindow ? <GameAddForm onClose={toggleModalWindow} /> : null}
            <Atoms.GamesHeader>
                <h2>Your games</h2>
                <QuickGame />
            </Atoms.GamesHeader>
            <GamesContainer />
            <FloatButtonsContainer>
                <Button onClick={toggleModalWindow} type="primary" shape="circle" icon="plus" size="large" />
            </FloatButtonsContainer>
        </>
    );
};

export default GamesPage;
