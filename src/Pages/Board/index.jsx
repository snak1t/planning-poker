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
import { fetchGame, findGameById } from '../../Data/Games/reducer';
import { FlexContainer, FlexItem } from '../../utils/FlexContainer';
import styled from 'styled-components';
import { AuthContext, checkIsAdmin, LOG_STATUS } from '../../Data/Auth/AuthContext';

const mapStateToProps = (state, { match: { params } }) => ({
    game: findGameById(params.gameID, state.games),
    isPlaying: state.playSession.isPlaying,
});

const mapDispatchToProps = {
    fetchGame,
    leaveRoom,
    enterRoom,
};

const PlayersWrapper = styled.div`
    flex-basis: 350px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const BoardContainer = ({ game, isPlaying, match, enterRoom, leaveRoom, fetchGame }) => {
    const user = useContext(AuthContext);
    useEffect(() => {
        enterRoom({ gameID: match.params.gameID, user });
        return leaveRoom;
    }, []);
    useEffect(
        () => {
            fetchGame({
                login: match.params.user,
                gameID: match.params.gameID,
            });
        },
        [match.params.gameID],
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
    game: PropTypes.object,
    user: PropTypes.object,
    fetchGame: PropTypes.func,
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
