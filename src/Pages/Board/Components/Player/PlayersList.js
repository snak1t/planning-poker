import React from 'react';
import { UserList, UserItem, UserAvatar, UserName, UserDefaultAvatar } from './atoms';

function PlayersList({ players }) {
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

export default PlayersList;
