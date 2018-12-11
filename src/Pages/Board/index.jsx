import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { branch, compose as composeHOC, renderComponent } from 'recompose';

import DeckContainer from './Components/Deck/Container';
import TableContainer from './Components/Table/Container';
import PlayersContainer from './Components/Player/Container';
import StoriesContainer from './Components/Stories/Container';
import { TemporaryLoginForm } from './Components/Player/ModalForm';

import { leaveRoom } from '../../Data/PlaySession/reducer.js';
import { addUnauthorizedUser, isAdmin, enterRoom } from '../../Data/Auth';
import { fetchGame, findGameById } from '../../Data/Games/reducer';
import { FlexContainer, FlexItem } from '../../utils/FlexContainer';
import styled from 'styled-components';

const mapStateToProps = (state, { match: { params } }) => ({
    game: findGameById(params.gameID, state.games),
    isAdmin: isAdmin(state, params.user),
    user: state.user,
    isPlaying: state.playSession.isPlaying,
});

const mapDispatchToProps = {
    fetchGame,
    addUnauthorizedUser,
    leaveRoom,
    enterRoom,
};

const enhancer = composeHOC(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    ),
    branch(({ user: { logStatus } }) => logStatus !== 'LOGGED_IN', renderComponent(TemporaryLoginForm)),
);

const PlayersWrapper = styled.div`
    flex-basis: 350px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const BoardContainer = ({ game, isAdmin, isPlaying, match, enterRoom, leaveRoom, fetchGame, user }) => {
    const { gameID } = match.params;
    useEffect(() => {
        enterRoom({ gameID, user });
        return leaveRoom;
    }, []);
    useEffect(
        () => {
            fetchGame({
                login: match.params.user,
                gameID,
            });
        },
        [gameID],
    );

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

export default enhancer(BoardContainer);
