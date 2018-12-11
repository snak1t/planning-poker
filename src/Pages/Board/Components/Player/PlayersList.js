import React, { useState, useEffect } from 'react';
import { UserList, UserItem, UserAvatar, UserName } from './atoms';

const generateRandomId = () => Math.round(Math.random() * 23);

function PlayersList({ players }) {
    const [playersWithAvatar, setPlayersWithAvatar] = useState([]);

    useEffect(
        () => {
            const playerToSet = players.map(player => {
                const playerInState = playersWithAvatar.find(({ user }) => player.user === user);
                return playerInState
                    ? playerInState
                    : {
                          ...player,
                          avatarId: generateRandomId(),
                      };
            });
            setPlayersWithAvatar(playerToSet);
        },
        [players],
    );

    return (
        <UserList>
            {playersWithAvatar.map(({ user, avatarId }, key) => (
                <UserItem key={key}>
                    <UserAvatar avatar={avatarId} />
                    <UserName>{user}</UserName>
                </UserItem>
            ))}
        </UserList>
    );
}

export default PlayersList;
