import React, { useContext, useState } from 'react';
import { GamesWrapper } from '../../atoms';
import { GamesContext } from '../../../../Data/Games/GamesContext';
import { AuthContext } from '../../../../Data/Auth/AuthContext';
import { GamesTable } from '../GamesTable/GamesTable';
import { EditedGameProvider } from '../EditedGameContext/EditedGameContext';

export const GamesContainer: React.SFC<{}> = () => {
  const { games, removeGame, updateGame } = useContext(GamesContext);
  const [editGameId, setEditGameId] = useState<null | string>(null);
  const currentlyEditedGame =
    games.find(game => game.id === editGameId) || null;
  const { user } = useContext(AuthContext);
  return (
    <GamesWrapper>
      {games.length === 0 ? (
        <h2>No games yet</h2>
      ) : (
        <EditedGameProvider
          game={currentlyEditedGame}
          onSubmit={game => {
            updateGame(game);
            setEditGameId(null);
          }}
        >
          <GamesTable
            getLinkUrl={id => `/game/${user.info.email}/${id}`}
            games={games}
            onRemoveGame={removeGame}
            onSetGameForEdit={setEditGameId}
            onCancelEditing={() => {
              setEditGameId(null);
            }}
          />
        </EditedGameProvider>
      )}
    </GamesWrapper>
  );
};
