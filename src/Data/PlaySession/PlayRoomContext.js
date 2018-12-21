import React, { useState } from 'react';
import merge from 'ramda/src/merge';
import flip from 'ramda/src/flip';
import { useSocket } from '../../utils/hooks/useSocket';
import socketTypes from '../../socket.es6';

const updateState = flip(merge);

const initialState = {
    scores: [],
    isPlaying: false,
    isRevealing: false,
    currentStory: '',
};

export const PlayRoomContext = React.createContext(initialState);

const SYNC_GAME_SESSION = '[sockets] SYNC_GAME_SESSION';
export function PlayRoomProvider({ children }) {
    const [gameStatus, setGameStatus] = useState(initialState);
    const emitSocket = useSocket([SYNC_GAME_SESSION], ({ payload }) => {
        // console.log(payload);
        return setGameStatus(updateState(payload));
    });
    const isCompleted = gameStatus.scores.every(player => player.score !== null);
    return (
        <PlayRoomContext.Provider value={{ ...gameStatus, isCompleted, dispatch: emitSocket }}>
            {children}
        </PlayRoomContext.Provider>
    );
}

export const enterRoom = payload => ({
    type: socketTypes.ENTER_ROOM,
    payload,
});

export const leaveRoom = payload => ({
    type: socketTypes.LEAVE_ROOM,
    payload,
});

export const setStoryToPlay = payload => ({
    type: socketTypes.EMIT_CURRENT_STORY,
    payload,
});

export const startPlaying = () => ({
    type: socketTypes.EMIT_READY_TO_PLAY,
});

export const revealCards = () => ({
    type: socketTypes.EMIT_SHOW_PLAYED_CARDS,
});

export const resetThePlay = _ => ({
    type: socketTypes.EMIT_RESET_BIDS,
});

export const setScore = payload => ({
    type: socketTypes.SEND_SCORE,
    payload,
});
