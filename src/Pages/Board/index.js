import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import { message } from 'antd';

import { DeckContainer } from './Components/Deck/Container';
import TableContainer from './Components/Table/Container';
import { PlayersContainer } from './Components/Player/Container';
import StoriesContainer from './Components/Stories/Container';
import { Chat } from './Components/Chat';
import { TemporaryLoginForm } from './Components/Player/ModalForm';
import { FlexContainer, FlexItem } from '../../utils/FlexContainer';
import { useAsyncEffect } from '../../utils/hooks/useAsyncEffect';
import { GamesContext, useCurrentGame } from '../../Data/Games/GamesContext';
import { PlayRoomProvider, PlayRoomContext, leaveRoom, enterRoom } from '../../Data/PlaySession/PlayRoomContext';
import { StoriesProvider } from '../../Data/Stories/StoriesContext';
import { AuthContext, LOGIN_STATUS, checkIsAdmin } from '../../Data/Auth/AuthContext';
import { ApiClient } from '../../utils/api-client';

const PlayersWrapper = styled.div`
    flex-basis: 350px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const BoardContainer = ({ match }) => {
    const { user } = useContext(AuthContext);
    const { isPlaying, dispatch } = useContext(PlayRoomContext);
    const { updateGame } = useContext(GamesContext);
    const currentGameId = match.params.gameID;
    const game = useCurrentGame(currentGameId);
    useEffect(() => {
        dispatch(
            enterRoom({
                gameID: match.params.gameID,
                user: {
                    login: user.info.name,
                    avatar: user.info.picture,
                },
            }),
        );
        return () => dispatch(leaveRoom());
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
            <FlexContainer vertical justify="center">
                <FlexItem basis="64px">
                    <header>
                        <h2>{game.title}</h2>
                    </header>
                </FlexItem>
                <FlexItem asContainer grow="1" style={{ maxHeight: '38rem' }}>
                    <StoriesContainer admin={isAdmin} />
                    <FlexItem grow="1">
                        <TableContainer admin={isAdmin} />
                    </FlexItem>
                    <PlayersWrapper>
                        <PlayersContainer />
                    </PlayersWrapper>
                </FlexItem>
                {isPlaying ? <DeckContainer /> : null}
            </FlexContainer>
            <Chat />
        </StoriesProvider>
    );
};

export default function BranchBoard(props) {
    const { user } = useContext(AuthContext);
    if ([LOGIN_STATUS.LOGGED_IN, LOGIN_STATUS.TEMP_USER].includes(user.loginStatus)) {
        return (
            <PlayRoomProvider>
                <BoardContainer {...props} />
            </PlayRoomProvider>
        );
    }
    return <TemporaryLoginForm {...props} />;
}
