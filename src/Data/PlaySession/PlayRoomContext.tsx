import * as React from 'react';
import { useSocket } from '../../utils/hooks/useSocket';

export type Player = {
    id: string;
    info: {
        picture: string | number;
        login: string;
    };
    score: string | number | null;
};

interface PlayRoomState {
    players: Player[];
    isPlaying: boolean;
    isRevealing: boolean;
    currentStory: null | string;
}

interface Action<T> {
    (value: T): void;
}

interface PlayRoom extends PlayRoomState {
    isCompleted: boolean;
    actions: {
        enterRoom: Action<Player>;
        leaveRoom: Action<undefined>;
        setStory: Action<string | null>;
        startPlayRound: Action<undefined>;
        showPlayedCards: Action<undefined>;
        setPlayerScore: Action<Player>;
    };
}

const initialState: PlayRoomState = {
    players: [],
    isPlaying: false,
    isRevealing: false,
    currentStory: null,
};

export const PlayRoomContext = React.createContext<PlayRoom>({
    ...initialState,
    isCompleted: false,
    actions: {
        enterRoom: () => {},
        leaveRoom: () => {},
        setStory: () => {},
        startPlayRound: () => {},
        showPlayedCards: () => {},
        setPlayerScore: () => {},
    },
});

type SocketListeners = {
    'append-user': (value: { newPlayer: Player }) => void;
    'self-append-user': (value: { newPlayer: Player }) => void;
    'apply-play-room-patch': (value: { patch: Partial<PlayRoomState> }) => void;
    'user-left': (value: { userId: string }) => void;
};

type Props = {
    gameId: string;
    isAdmin: boolean;
};

const resetPlayersScores = (users: Player[]): Player[] => {
    return users.map(user => ({ ...user, score: null }));
};

export const PlayRoomProvider: React.SFC<Props> = ({ children, gameId, isAdmin }) => {
    const [gameStatus, setGameStatus] = React.useState(initialState);
    const emitSocket2 = useSocket<SocketListeners>({
        'self-append-user': ({ newPlayer }) => {
            setGameStatus(prevState => {
                const newScores = prevState.players.map(playerScore =>
                    playerScore.id.startsWith('temp__') && playerScore.info.login === newPlayer.info.login
                        ? newPlayer
                        : playerScore,
                );
                return {
                    ...prevState,
                    players: newScores,
                };
            });
        },
        'append-user': ({ newPlayer }) => {
            setGameStatus(prevState => {
                const newScores = prevState.players.concat(newPlayer);
                if (isAdmin) {
                    emitPatch({ players: newScores });
                }
                return { ...prevState, players: newScores };
            });
        },
        'apply-play-room-patch': ({ patch }) => {
            setGameStatus(prevState => ({ ...prevState, ...patch }));
        },
        'user-left': ({ userId }) => {
            setGameStatus(prevState => ({
                ...prevState,
                players: prevState.players.filter(player => player.id !== userId),
            }));
        },
    });

    const enterRoom: Action<Player> = user => {
        const newPlayer: Player = { ...user, score: null, id: `temp__${Math.random() * 100}` };
        setGameStatus(prevState => {
            return {
                ...prevState,
                players: prevState.players.concat(newPlayer),
            };
        });
        emitSocket2('enter-room', { gameId, newPlayer });
    };

    const leaveRoom: Action<undefined> = () => {
        emitSocket2('leave-room', { gameId });
    };

    const emitPatch = (patch: Partial<PlayRoomState>): Partial<PlayRoomState> => {
        emitSocket2('emit-play-room-patch', { gameId, patch });
        return patch;
    };

    const setAndEmitPatch = (cb: (prevState: PlayRoomState) => Partial<PlayRoomState>) => {
        setGameStatus(prevState => {
            return {
                ...prevState,
                ...emitPatch(cb(prevState)),
            };
        });
    };

    const setStory: Action<string | null> = storyId => {
        setAndEmitPatch(prevState => ({
            isPlaying: false,
            isRevealing: false,
            currentStory: storyId,
            players: resetPlayersScores(prevState.players),
        }));
    };

    const startPlayRound: Action<undefined> = () => {
        setAndEmitPatch(prevState => ({
            isPlaying: true,
            isRevealing: false,
            players: resetPlayersScores(prevState.players),
        }));
    };

    const showPlayedCards: Action<undefined> = () => {
        setAndEmitPatch(() => ({
            isPlaying: false,
            isRevealing: true,
        }));
    };

    const setPlayerScore: Action<Player> = playerScore => {
        setAndEmitPatch(prevState => ({
            players: prevState.players.map(player =>
                player.info.login === playerScore.info.login ? playerScore : player,
            ),
        }));
    };

    const isCompleted = gameStatus.players.every(player => player.score !== null);
    // TODO: memoize provider value to fix unneeded re-renders
    return (
        <PlayRoomContext.Provider
            value={{
                ...gameStatus,
                isCompleted,
                actions: { enterRoom, setStory, startPlayRound, showPlayedCards, setPlayerScore, leaveRoom },
            }}
        >
            {children}
        </PlayRoomContext.Provider>
    );
};
