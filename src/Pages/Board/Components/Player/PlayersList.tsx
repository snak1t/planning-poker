import * as React from 'react';
import * as Atoms from './atoms';
import { PlayRoomContext } from '../../../../Data/PlaySession/PlayRoomContext';
import { Player } from './Player';

export const PlayersList: React.SFC<{}> = () => {
    const { scores: players } = React.useContext(PlayRoomContext);
    return (
        <Atoms.UserList>
            {players.map(player => (
                <Player key={player.user} user={player} />
            ))}
        </Atoms.UserList>
    );
};
