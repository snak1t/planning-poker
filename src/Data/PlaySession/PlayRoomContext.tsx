import * as React from 'react';
import { useSocket } from '../../utils/hooks/useSocket';
import socketTypes from '../../socket.es6';

function mergeState<T>(partialObject: Partial<T>) {
    return (initialObject: T): T => ({ ...initialObject, ...partialObject });
}
export type User = {
    avatar: string | number;
    user: string;
    score: string | number | null;
};
interface PlayRoomState {
    scores: User[];
    isPlaying: boolean;
    isRevealing: boolean;
    currentStory: null | string;
}

type EmitAction = {
    type: string;
    payload?: any;
};

interface PlayRoom extends PlayRoomState {
    isCompleted: boolean;
    dispatch: (value: EmitAction) => void;
}

const initialState: PlayRoomState = {
    scores: [],
    isPlaying: false,
    isRevealing: false,
    currentStory: null,
};

export const PlayRoomContext = React.createContext<PlayRoom>({
    ...initialState,
    dispatch: () => {},
    isCompleted: false,
});

const SYNC_GAME_SESSION = '[sockets] SYNC_GAME_SESSION';

export const PlayRoomProvider: React.SFC<{}> = ({ children }) => {
    const [gameStatus, setGameStatus] = React.useState(initialState);
    const emitSocket = useSocket([SYNC_GAME_SESSION], ({ payload }: { payload: PlayRoomState }) => {
        return setGameStatus(mergeState(payload));
    });
    const isCompleted = gameStatus.scores.every(player => player.score !== null);
    // TODO: memoize provider value to fix unneeded re-renders
    return (
        <PlayRoomContext.Provider value={{ ...gameStatus, isCompleted, dispatch: emitSocket }}>
            {children}
        </PlayRoomContext.Provider>
    );
};

export const enterRoom = (payload: any) => ({
    type: socketTypes.ENTER_ROOM,
    payload,
});

export const leaveRoom = (payload: any) => ({
    type: socketTypes.LEAVE_ROOM,
    payload,
});

export const setStoryToPlay = (payload: any) => ({
    type: socketTypes.EMIT_CURRENT_STORY,
    payload,
});

export const startPlaying = () => ({
    type: socketTypes.EMIT_READY_TO_PLAY,
});

export const revealCards = () => ({
    type: socketTypes.EMIT_SHOW_PLAYED_CARDS,
});

export const resetThePlay = () => ({
    type: socketTypes.EMIT_RESET_BIDS,
});

export const setScore = (payload: User) => ({
    type: socketTypes.SEND_SCORE,
    payload,
});
