import React, { useEffect, useContext } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import { message } from 'antd';

import { DeckContainer } from './Components/Deck/Container';
import TableContainer from './Components/Table/Container';
import { PlayersContainer } from './Components/Player/Container';
import StoriesContainer from './Components/Stories/Container';
import { Chat } from './Components/Chat';
import { TemporaryLoginForm } from './Components/Player/ModalForm';
import { FlexContainer, FlexItem } from '../../utils/FlexContainer';
import { AuthContext, checkIsAdmin, LOG_STATUS } from '../../Data/Auth/AuthContext';
import { useAsyncEffect } from '../../utils/hooks/useAsyncEffect';
import { GamesContext, useCurrentGame } from '../../Data/Games/GamesContext';
import { PlayRoomProvider, PlayRoomContext, leaveRoom, enterRoom } from '../../Data/PlaySession/PlayRoomContext';
import { StoriesProvider } from '../../Data/Stories/StoriesContext';

const PlayersWrapper = styled.div`
    flex-basis: 350px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const BoardContainer = ({ match, tempUpdateGame }) => {
    const user = useContext(AuthContext);
    const { isPlaying, dispatch } = useContext(PlayRoomContext);
    const { updateGame } = useContext(GamesContext);
    const currentGameId = match.params.gameID;
    const game = useCurrentGame(currentGameId);
    useEffect(() => {
        dispatch(enterRoom({ gameID: match.params.gameID, user }));
        return () => dispatch(leaveRoom());
    }, []);
    useAsyncEffect(
        async () => {
            try {
                const { data } = await Axios.post('/api/game/find', {
                    login: match.params.user,
                    gameID: match.params.gameID,
                });
                updateGame(data.game);
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
    const { logStatus } = useContext(AuthContext);
    if ([LOG_STATUS.LOGGED_IN, LOG_STATUS.TEMP_USER].includes(logStatus)) {
        return (
            <PlayRoomProvider>
                <BoardContainer {...props} />
            </PlayRoomProvider>
        );
    }
    return <TemporaryLoginForm {...props} />;
}
