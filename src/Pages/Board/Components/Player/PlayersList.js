import React from 'react';
import { UserList, UserItem, UserAvatar, UserName } from './atoms';

class PlayersList extends React.Component {
    state = {
        players: [],
    };

    static generateRandomId() {
        return Math.round(Math.random() * 23);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const players = nextProps.players.map(player => {
            const playerInState = prevState.players.find(({ user }) => player.user === user);
            if (playerInState) {
                return playerInState;
            }
            return {
                ...player,
                avatarId: PlayersList.generateRandomId(),
            };
        });
        return {
            players,
        };
    }

    render() {
        const { players } = this.state;
        return (
            <UserList>
                {players.map(({ user, avatarId }, key) => (
                    <UserItem key={key}>
                        <UserAvatar avatar={avatarId} />
                        <UserName>{user}</UserName>
                    </UserItem>
                ))}
            </UserList>
        );
    }
}

export default PlayersList;
