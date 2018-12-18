import React, { useContext } from 'react';

import PlayersList from './PlayersList';
import { PlayRoomContext } from '../../../../Data/PlaySession/PlayRoomContext';

export function PlayersContainer() {
    const { scores } = useContext(PlayRoomContext);
    return <PlayersList players={scores} />;
}
