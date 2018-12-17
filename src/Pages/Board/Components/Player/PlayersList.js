import React from 'react';
import { UserList, UserItem, UserAvatar, UserName } from './atoms';

function PlayersList({ players }) {
    return (
        <UserList>
            {players.map(({ user, avatar }, key) => (
                <UserItem key={key}>
                    <UserAvatar avatar={avatar} />
                    <UserName>{user}</UserName>
                </UserItem>
            ))}
        </UserList>
    );
}

export default PlayersList;
