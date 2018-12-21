import React, { useContext } from 'react';
import { UserList, UserItem, UserAvatar, UserName, UserDefaultAvatar } from './atoms';
import { PlayRoomContext } from '../../../../Data/PlaySession/PlayRoomContext';

export function PlayersList() {
    const { scores: players } = useContext(PlayRoomContext);
    return (
        <UserList>
            {players.map(({ user, avatar }, key) => (
                <UserItem key={key}>
                    {typeof avatar === 'number' ? (
                        <UserDefaultAvatar avatar={avatar} />
                    ) : (
                        <UserAvatar avatar={avatar} />
                    )}
                    <UserName>{user}</UserName>
                </UserItem>
            ))}
        </UserList>
    );
}
