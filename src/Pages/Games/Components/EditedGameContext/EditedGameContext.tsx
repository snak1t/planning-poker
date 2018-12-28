import React, { useState, useEffect } from 'react';
import { Game } from '../../../../Data/Games/GamesContext';

type EditedGameContextType = {
    game: Game | null;
    updateField<T extends keyof Game>(field: T, value: Game[T]): void;
    submitGame: () => void;
};

type EditedGameProps = {
    game: Game | null;
    onSubmit: (game: Game) => void;
};

export const EditedGameContext = React.createContext<EditedGameContextType>({
    game: null,
    updateField: () => {},
    submitGame: () => {},
});

export const EditedGameProvider: React.SFC<EditedGameProps> = ({ game, onSubmit, children }) => {
    const [clonedGame, updateClonedGame] = useState<Game | null>(game);
    useEffect(
        () => {
            updateClonedGame(game);
        },
        [game],
    );
    const updateField: EditedGameContextType['updateField'] = (key, value) => {
        return updateClonedGame(prevGame => (prevGame ? { ...prevGame, [key]: value } : null));
    };

    const submitGame: EditedGameContextType['submitGame'] = () => {
        if (clonedGame) {
            onSubmit(clonedGame);
        }
    };

    return (
        <EditedGameContext.Provider value={{ game: clonedGame, updateField, submitGame }}>
            {children}
        </EditedGameContext.Provider>
    );
};
