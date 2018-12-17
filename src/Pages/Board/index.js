import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DeckContainer from './Components/Deck/Container';
import TableContainer from './Components/Table/Container';
import PlayersContainer from './Components/Player/Container';
import StoriesContainer from './Components/Stories/Container';
import { TemporaryLoginForm } from './Components/Player/ModalForm';

import { leaveRoom } from '../../Data/PlaySession/reducer.js';
import { enterRoom } from '../../Data/Auth';
import { FlexContainer, FlexItem } from '../../utils/FlexContainer';
import styled from 'styled-components';
import { AuthContext, checkIsAdmin, LOG_STATUS } from '../../Data/Auth/AuthContext';
import Axios from 'axios';
import { useAsyncEffect } from '../../utils/hooks/useAsyncEffect';
import { message } from 'antd';
import { GamesContext, useCurrentGame } from '../../Data/Games/GamesContext';
import { updateGame } from '../../Data/Games/reducer';

const mapStateToProps = state => ({
    isPlaying: state.playSession.isPlaying,
});

const mapDispatchToProps = {
    leaveRoom,
    enterRoom,
    tempUpdateGame: updateGame,
};

const PlayersWrapper = styled.div`
    flex-basis: 350px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const BoardContainer = ({ isPlaying, match, enterRoom, leaveRoom, tempUpdateGame }) => {
    const user = useContext(AuthContext);
    const { updateGame } = useContext(GamesContext);
    const currentGameId = match.params.gameID;
    const game = useCurrentGame(currentGameId);
    useEffect(() => {
        enterRoom({ gameID: match.params.gameID, user });
        return leaveRoom;
    }, []);
    useAsyncEffect(
        async () => {
            try {
                const { data } = await Axios.post('/api/game/find', {
                    login: match.params.user,
                    gameID: match.params.gameID,
                });
                updateGame(data.game);
                tempUpdateGame(data.game);
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
    );
};

BoardContainer.propTypes = {
    addUnauthorizedUser: PropTypes.func,
    enterRoom: PropTypes.func,
};

function BranchBoard(props) {
    const { logStatus } = useContext(AuthContext);
    if ([LOG_STATUS.LOGGED_IN, LOG_STATUS.TEMP_USER].includes(logStatus)) {
        return <BoardContainer {...props} />;
    }
    return <TemporaryLoginForm {...props} />;
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BranchBoard);
