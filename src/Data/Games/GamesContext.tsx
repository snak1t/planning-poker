import React, { useState, useContext } from 'react';
import { message } from 'antd';
import { filter, append } from 'ramda';
import { useAsyncEffect } from '../../utils/hooks/useAsyncEffect';
import { AuthContext } from '../Auth/AuthContext';
import { ApiClient } from '../../utils/api/api-client';

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
  addGame: (game: Partial<Game>) => Promise<void>;
  updateGame: (game: Partial<Game>) => Promise<void>;
  mergeGame: (game: Game) => void;
};

export const GamesContext = React.createContext<GameContextType>({
  games: [],
  removeGame: () => Promise.resolve(),
  addGame: () => Promise.resolve(),
  updateGame: () => Promise.resolve(),
  mergeGame: () => {},
});

export const GamesProvider: React.SFC<Props> = ({
  initialGames = [],
  children,
  readyToFetch,
}) => {
  const [games, setGames] = useState(initialGames);
  const { user } = useContext(AuthContext);
  useAsyncEffect(
    async () => {
      if (!readyToFetch) {
        return;
      }
      try {
        const { data } = await ApiClient.get<{ games: Game[] }>(
          `/api/game/user/${user.info.email}`,
        );
        return setGames(data.games);
      } catch (error) {
        console.error(error);
      }
    },
    [readyToFetch],
  );

  const removeGame = async (gameId: string) => {
    try {
      const { data } = await ApiClient.delete<Game>(`/api/game/`, {
        params: { gameId },
      });
      setGames(filter<Game>(game => game.id !== data.id));
    } catch (error) {
      message.error(error.message);
    }
  };

  const addGame = async (formData: Partial<Game>) => {
    try {
      const { data } = await ApiClient.post<Partial<Game>, { game: Game }>(
        '/api/game',
        {
          ...formData,
          user: user.info.email,
        },
      );
      setGames(append(data.game));
    } catch (error) {
      message.error(error.message);
    }
  };

  const mergeGame = (updatedGame: Game) => {
    setGames(prevGames => {
      const isGamePresent = prevGames.find(game => game.id === updatedGame.id);
      if (isGamePresent) {
        return prevGames.map(game =>
          game.id === updatedGame.id ? { ...game, ...updatedGame } : game,
        );
      } else {
        return prevGames.concat(updatedGame);
      }
    });
  };

  const updateGame = async (formData: Partial<Game>) => {
    const { data } = await ApiClient.put<Partial<Game>, { game: Game }>(
      '/api/game',
      formData,
    );
    mergeGame(data.game);
  };

  return (
    <GamesContext.Provider
      value={{ games, removeGame, addGame, mergeGame, updateGame }}
    >
      {children}
    </GamesContext.Provider>
  );
};

export const useCurrentGame = (gameId: string) => {
  const { games } = useContext(GamesContext);
  const game = games.find(game => game.id.toString() === gameId);
  return game;
};
