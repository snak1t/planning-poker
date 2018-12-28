import React from 'react';
import { render, cleanup, fireEvent, Matcher } from 'react-testing-library';
import { GameAddForm } from './GameAddForm';
import { GamesContext } from '../../../../Data/Games/GamesContext';
import message from 'antd/lib/message';
jest.mock('antd/lib/message');

describe('<GameAddForm /> ', () => {
    let onClose: jest.Mock<{}>;
    let removeGame: jest.Mock<{}>;
    let addGame: jest.Mock<{}>;
    let updateGame: jest.Mock<{}>;
    let gamesProvidesMock: {
        games: [];
        addGame: typeof addGame;
        updateGame: typeof updateGame;
        removeGame: typeof removeGame;
    };
    beforeEach(() => {
        onClose = jest.fn();
        removeGame = jest.fn();
        addGame = jest.fn();
        updateGame = jest.fn();
        gamesProvidesMock = {
            games: [],
            addGame,
            removeGame,
            updateGame,
        };
    });
    afterEach(cleanup);

    const updateFormValues = (
        getFn: (text: Matcher) => HTMLElement,
        values: { description: string; title: string },
    ) => {
        const titleInput = getFn('game-title-input') as HTMLInputElement;
        const descriptionInput = getFn('game-description-input') as HTMLInputElement;

        fireEvent.change(titleInput, {
            target: {
                value: values.title,
            },
        });
        fireEvent.change(descriptionInput, {
            target: {
                value: values.description,
            },
        });
    };

    it('should be rendered', () => {
        const { baseElement } = render(
            <GamesContext.Provider value={gamesProvidesMock}>
                <GameAddForm onClose={onClose} />
            </GamesContext.Provider>,
        );
        expect(baseElement).toMatchSnapshot();
    });

    it('should trigger on close button on closing the window', () => {
        const { getByText } = render(
            <GamesContext.Provider value={gamesProvidesMock}>
                <GameAddForm onClose={onClose} />
            </GamesContext.Provider>,
        );
        const cancelButton = getByText('Cancel').parentElement;
        if (cancelButton) {
            fireEvent.click(cancelButton);
        }
        expect(onClose).toHaveBeenCalled();
    });

    it('should trigger addGame function on adding the game', () => {
        const { getByText, getByTestId } = render(
            <GamesContext.Provider value={gamesProvidesMock}>
                <GameAddForm onClose={onClose} />
            </GamesContext.Provider>,
        );
        const okButton = getByText('OK').parentElement;
        const testedData = {
            title: 'Sprint 12',
            description: 'Some Description',
        };
        updateFormValues(getByTestId, testedData);
        if (okButton) {
            fireEvent.click(okButton);
        }
        expect(addGame).toHaveBeenCalled();
        expect(addGame).toHaveBeenCalledWith(testedData);
    });

    it('should close the window after adding the game', () => {
        const { getByText, getByTestId } = render(
            <GamesContext.Provider value={gamesProvidesMock}>
                <GameAddForm onClose={onClose} />
            </GamesContext.Provider>,
        );
        const testedData = {
            title: 'Sprint 12',
            description: 'Some Description',
        };
        updateFormValues(getByTestId, testedData);
        const okButton = getByText('OK').parentElement;
        if (okButton) {
            fireEvent.click(okButton);
        }
        expect(onClose).toHaveBeenCalled();
    });
    it('should not add game with missing title property', () => {
        const { getByText, getByTestId } = render(
            <GamesContext.Provider value={gamesProvidesMock}>
                <GameAddForm onClose={onClose} />
            </GamesContext.Provider>,
        );
        const okButton = getByText('OK').parentElement;
        const testedData = {
            title: '',
            description: 'Some Description',
        };
        updateFormValues(getByTestId, testedData);
        if (okButton) {
            fireEvent.click(okButton);
        }
        expect(addGame).not.toHaveBeenCalled();
        expect(message.info).toHaveBeenCalledWith('Each game should have a title');
    });
});
