import React, { useContext, useEffect } from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import { EditedGameProvider, EditedGameContext } from './EditedGameContext';
import { Game } from '../../../../Data/Games/GamesContext';

const dummyGame: Game = {
    description: 'Dummy description',
    id: 'Dummy id',
    user: 'Dummy user',
    title: 'Dummy title',
    isCompleted: false,
    storiesCount: 10,
};

const DummyComponent = () => {
    const { game, updateField, submitGame } = useContext(EditedGameContext);
    const setTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateField('title', event.target.value);
    };
    const setDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateField('description', event.target.value);
    };
    if (game === null) return null;
    return (
        <>
            <div data-testid="title-header">{game.title}</div>
            <input data-testid="title-input" value={game.title} onChange={setTitle} />

            <div data-testid="description-header">{game.description}</div>
            <input data-testid="description-input" value={game.description} onChange={setDescription} />
            <button data-testid="submit-button" onClick={submitGame}>
                On Submit
            </button>
        </>
    );
};

describe('<EditedGameContext />', () => {
    afterEach(cleanup);

    it('should render passed children', () => {
        const { getByTestId } = render(
            <EditedGameProvider game={null} onSubmit={() => {}}>
                <div data-testid="rendered-element">I am rendered</div>
            </EditedGameProvider>,
        );
        expect(getByTestId('rendered-element').textContent).toBe('I am rendered');
    });

    it('should provide a function to change a specific field without changing initial object', () => {
        const { getByTestId } = render(
            <EditedGameProvider game={dummyGame} onSubmit={() => {}}>
                <DummyComponent />
            </EditedGameProvider>,
        );

        expect(getByTestId('title-header').textContent).toBe('Dummy title');
        fireEvent.change(getByTestId('title-input'), {
            target: { value: 'New title' },
        });
        expect(getByTestId('title-header').textContent).toBe('New title');
        expect(dummyGame.title).toBe('Dummy title');
    });
    it('should call onSubmit with updated fields', () => {
        const onSubmit = jest.fn();
        const { getByTestId } = render(
            <EditedGameProvider game={dummyGame} onSubmit={onSubmit}>
                <DummyComponent />
            </EditedGameProvider>,
        );
        fireEvent.change(getByTestId('title-input'), {
            target: { value: 'New title' },
        });

        fireEvent.change(getByTestId('description-input'), {
            target: { value: 'New description' },
        });

        fireEvent.click(getByTestId('submit-button'));
        const expectedGameObject = { ...dummyGame, title: 'New title', description: 'New description' };
        expect(onSubmit).toHaveBeenCalled();
        expect(onSubmit).toHaveBeenCalledWith(expectedGameObject);
    });
});
