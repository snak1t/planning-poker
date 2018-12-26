import React, { useEffect, useContext } from 'react';
import { message } from 'antd';

import { DeckContainer } from './Components/Deck';
import { TableContainer } from './Components/Table/Container';
import { StoriesContainer } from './Components/Stories/Container';
import { TemporaryLoginForm } from './Components/Player/TemporaryLoginForm';
import { useCurrentGame, GamesContext } from '../../Data/Games/GamesContext';
import { PlayRoomProvider, PlayRoomContext } from '../../Data/PlaySession/PlayRoomContext';
import { StoriesProvider } from '../../Data/Stories/StoriesContext';
import { AuthContext, LOGIN_STATUS, checkIsAdmin } from '../../Data/Auth/AuthContext';
import { PlayersList } from './Components/Player/PlayersList';
import * as Atoms from './atoms';
import { ActionButtons } from './Components/ActionButton/ActionButtons';
import { useAsyncEffect } from '../../utils/hooks/useAsyncEffect';
import { ApiClient } from '../../utils/api-client';

export const BoardContainer = ({ match }) => {
    const { user } = useContext(AuthContext);
    const { updateGame } = useContext(GamesContext);
    const { isPlaying, actions } = useContext(PlayRoomContext);
    const currentGameId = match.params.gameID;
    const game = useCurrentGame(currentGameId);
    useEffect(() => {
        actions.enterRoom({
            info: {
                login: user.info.name,
                picture: user.info.picture,
            },
        });
        return actions.leaveRoom;
    }, []);
    useAsyncEffect(
        async () => {
            try {
                const { data } = await ApiClient.get(`/api/game/${currentGameId}`);
                updateGame(data);
            } catch (error) {
                message.error(error.message);
            }
        },
        [currentGameId],
    );
    const isAdmin = checkIsAdmin(user, match.params.user);
    if (!game) {
        return <h1>No game</h1>;
    }
    return (
        <StoriesProvider gameId={currentGameId}>
            <Atoms.GridWrapper>
                <Atoms.GridHeader>
                    <h2>{game.title}</h2>
                </Atoms.GridHeader>
                <Atoms.GridStories>
                    <StoriesContainer admin={isAdmin} />
                </Atoms.GridStories>
                <Atoms.GridPlayers>
                    <PlayersList />
                </Atoms.GridPlayers>
                <Atoms.GridDeck>
                    <TableContainer admin={isAdmin} />
                    {isPlaying ? <DeckContainer /> : null}
                </Atoms.GridDeck>
            </Atoms.GridWrapper>
            <ActionButtons />
        </StoriesProvider>
    );
};

export default function BranchBoard(props) {
    const { user } = useContext(AuthContext);
    const isAdmin = checkIsAdmin(user, props.match.params.user);
    if ([LOGIN_STATUS.LOGGED_IN, LOGIN_STATUS.TEMP_USER].includes(user.loginStatus)) {
        return (
            <PlayRoomProvider gameId={props.match.params.gameID} isAdmin={isAdmin}>
                <BoardContainer {...props} />
            </PlayRoomProvider>
        );
    }
    return <TemporaryLoginForm {...props} />;
}
