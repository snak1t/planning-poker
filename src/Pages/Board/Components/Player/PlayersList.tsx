import * as React from 'react';
import * as Atoms from './atoms';
import { PlayRoomContext } from '../../../../Data/PlaySession/PlayRoomContext';
import { PlayerComponent } from './Player';

export const PlayersList: React.SFC<{}> = () => {
    const { players } = React.useContext(PlayRoomContext);
    return (
        <Atoms.UserList>
            {players.map((player, index) => (
                <PlayerComponent key={index} user={player} />
            ))}
        </Atoms.UserList>
    );
};
