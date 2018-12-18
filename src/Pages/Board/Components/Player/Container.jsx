import React, { useContext } from 'react';

import { ChatContainer } from '../Chat';
import PlayersList from './PlayersList';
import { PlayRoomContext } from '../../../../Data/PlaySession/PlayRoomContext';

export function PlayersContainer() {
    const { scores } = useContext(PlayRoomContext);
    return (
        <React.Fragment>
            <PlayersList players={scores} />
            <ChatContainer />
        </React.Fragment>
    );
}
