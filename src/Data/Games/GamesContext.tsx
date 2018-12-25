import React, { useState, useContext } from 'react';
import { message } from 'antd';
import { filter, append } from 'ramda';
import { useAsyncEffect } from '../../utils/hooks/useAsyncEffect';
import { AuthContext } from '../Auth/AuthContext';
import { ApiClient } from '../../utils/api-client';

export type Game = {
    id: string;
    user: string;
    title: string;
    description: string;
    isCompleted: boolean;
    storiesCount: number;
};

type Props = {
    initialGames: Game[];
    readyToFetch: boolean;
};

type GameContextType = {
    games: Game[];
    removeGame: (id: string) => Promise<void>;
    addGame: (game: Game) => Promise<void>;
};

export const GamesContext = React.createContext<GameContextType>({
    games: [],
    removeGame: () => Promise.resolve(),
    addGame: () => Promise.resolve(),
});

export const GamesProvider: React.SFC<Props> = ({ initialGames = [], children, readyToFetch }) => {
    const [games, setGames] = useState(initialGames);
    const { user } = useContext(AuthContext);
    useAsyncEffect(
        async () => {
            if (!readyToFetch) {
                return;
            }
            try {
                const { data } = await ApiClient.get(`/api/game/user/${user.info.email}`);
                return setGames(data.games);
            } catch (error) {
                console.error(error);
            }
        },
        [readyToFetch],
    );

    const removeGame = async (gameId: string) => {
        try {
            const { data }: { data: Game } = await ApiClient.delete(`/api/game/`, { params: { gameId } });
            setGames(filter<Game>(game => game.id !== data.id));
        } catch (error) {
            message.error(error.message);
        }
    };
    const addGame = async (formData: Game) => {
        try {
            const { data } = await ApiClient.post('/api/game', { ...formData, user: user.info.email });
            setGames(append(data.game));
        } catch (error) {
            message.error(error.message);
        }
    };

    // const updateGame = (updatedGame: Game) => {
    //     setGames(prevGames => {
    //         const isGamePresent = prevGames.find(game => game.id === updatedGame.id);
    //         if (isGamePresent) {
    //             return prevGames.map(game => (game.id === updatedGame.id ? { ...game, ...updatedGame } : game));
    //         } else {
    //             return prevGames.concat(updatedGame);
    //         }
    //     });
    // };

    return <GamesContext.Provider value={{ games, removeGame, addGame }}>{children}</GamesContext.Provider>;
};

export const useCurrentGame = (gameId: string) => {
    const { games } = useContext(GamesContext);
    const game = games.find(game => game.id.toString() === gameId);
    return game;
};