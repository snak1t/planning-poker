import React, { useState, useContext } from 'react';
import Axios from 'axios';
import { message } from 'antd';
import filter from 'ramda/src/filter';
import append from 'ramda/src/append';
import { useAsyncEffect } from '../../utils/hooks/useAsyncEffect';
export const GamesContext = React.createContext();

export function GamesProvider({ initialGames = [], children, readyToFetch }) {
    const [games, setGames] = useState(initialGames);
    useAsyncEffect(
        async () => {
            if (!readyToFetch) {
                return;
            }
            try {
                const { data: userData } = await Axios.get('/api/user');
                const gamesToSet = userData.login ? userData.games : [];
                return setGames(gamesToSet);
            } catch (error) {
                console.error(error);
            }
        },
        [readyToFetch],
    );

    const removeGame = async gameId => {
        try {
            const { data } = await Axios.delete(`/api/game/${gameId}`);
            setGames(filter(game => game._id !== data.id));
        } catch (error) {
            message.error(error.message);
        }
    };
    const addGame = async formData => {
        try {
            const { data } = await Axios.post('/api/game', formData);
            setGames(append(data.game));
        } catch (error) {
            message.error(error.message);
        }
    };

    const updateGame = updatedGame => {
        setGames(prevGames => {
            const isGamePresent = prevGames.find(game => game._id === updatedGame._id);
            if (isGamePresent) {
                return prevGames.map(game => (game._id === updatedGame._id ? updatedGame : game));
            } else {
                return prevGames.concat(updatedGame);
            }
        });
    };
    return <GamesContext.Provider value={{ games, removeGame, addGame, updateGame }}>{children}</GamesContext.Provider>;
}

export const useCurrentGame = gameId => {
    const { games } = useContext(GamesContext);
    const game = games.find(game => game._id === gameId);
    return game;
};
