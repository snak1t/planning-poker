import React, { useState, useContext } from 'react';
import { message } from 'antd';
import filter from 'ramda/src/filter';
import append from 'ramda/src/append';
import { useAsyncEffect } from '../../utils/hooks/useAsyncEffect';
import { AuthContext } from '../Auth/AuthContext';
import { ApiClient } from '../../utils/api-client';
export const GamesContext = React.createContext();

export function GamesProvider({ initialGames = [], children, readyToFetch }) {
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

    const removeGame = async gameId => {
        try {
            const { data } = await ApiClient.delete(`/api/game/`, { params: { gameId } });
            setGames(filter(game => game.id !== data.id));
        } catch (error) {
            message.error(error.message);
        }
    };
    const addGame = async formData => {
        try {
            const { data } = await ApiClient.post('/api/game', { ...formData, user: user.info.email });
            setGames(append(data.game));
        } catch (error) {
            message.error(error.message);
        }
    };

    const updateGame = updatedGame => {
        setGames(prevGames => {
            const isGamePresent = prevGames.find(game => game.id === updatedGame.id);
            if (isGamePresent) {
                return prevGames.map(game => (game.id === updatedGame.id ? updatedGame : game));
            } else {
                return prevGames.concat(updatedGame);
            }
        });
    };
    return <GamesContext.Provider value={{ games, removeGame, addGame, updateGame }}>{children}</GamesContext.Provider>;
}

export const useCurrentGame = gameId => {
    const { games } = useContext(GamesContext);
    const game = games.find(game => game.id.toString() === gameId);
    return game;
};
