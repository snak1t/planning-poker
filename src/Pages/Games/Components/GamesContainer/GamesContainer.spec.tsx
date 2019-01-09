import React from 'react';
import {
  cleanup,
  render,
  fireEvent,
  waitForElement,
} from 'react-testing-library';
import { GamesContainer } from './GamesContainer';
import { AuthContext } from '../../../../Data/Auth/AuthContext';
import { GamesContext, Game } from '../../../../Data/Games/GamesContext';
import { MemoryRouter } from 'react-router';
const mockedGames: Game[] = [
  {
    id: '1',
    description: 'Game1 description',
    title: 'Game1 title',
    isCompleted: false,
    storiesCount: 1,
    user: 'user1',
  },
  {
    id: '2',
    description: 'Game2 description',
    title: 'Game2 title',
    isCompleted: true,
    storiesCount: 2,
    user: 'user1',
  },
];
describe('<GamesContainer />: ', () => {
  afterEach(cleanup);

  let addGame: (game: Partial<Game>) => Promise<void>;
  let updateGame: (game: Partial<Game>) => Promise<void>;
  let removeGame: (id: string) => Promise<void>;
  let mergeGame: (game: Game) => void;
  beforeEach(() => {
    addGame = jest.fn().mockName('addGame');
    updateGame = jest.fn().mockName('updateGame');
    removeGame = jest.fn().mockName('removeGame');
    mergeGame = jest.fn().mockName('mergeGame');
  });

  it('should render empty title if there is no game', () => {
    const { getByText } = render(
      <AuthContext.Provider
        value={{
          user: {
            info: {
              email: 'test@test.com',
            },
          },
        }}
      >
        <GamesContext.Provider
          value={{
            games: [],
            addGame,
            removeGame,
            mergeGame,
            updateGame,
          }}
        >
          <GamesContainer />
        </GamesContext.Provider>
      </AuthContext.Provider>,
    );

    expect(getByText('No games yet')).toBeDefined();
  });

  it('should not render empty title if games provided', () => {
    const { queryByText } = render(
      <MemoryRouter>
        <AuthContext.Provider
          value={{
            user: {
              info: {
                email: 'test@test.com',
              },
            },
          }}
        >
          <GamesContext.Provider
            value={{
              games: mockedGames,
              addGame,
              removeGame,
              updateGame,
              mergeGame,
            }}
          >
            <GamesContainer />
          </GamesContext.Provider>
        </AuthContext.Provider>
      </MemoryRouter>,
    );

    expect(queryByText('No games yet')).toBeNull();
  });

  it('should set the right game for edit mode', async () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <AuthContext.Provider
          value={{
            user: {
              info: {
                email: 'test@test.com',
              },
            },
          }}
        >
          <GamesContext.Provider
            value={{
              games: mockedGames,
              addGame,
              removeGame,
              mergeGame,
              updateGame,
            }}
          >
            <GamesContainer />
          </GamesContext.Provider>
        </AuthContext.Provider>
      </MemoryRouter>,
    );
    const firstEditButton = getByTestId('game-edit-btn');
    fireEvent.click(firstEditButton);
    const firstTitleInput = (await waitForElement(() =>
      getByTestId('game-title-input'),
    )) as HTMLInputElement;
    expect(firstTitleInput.value).toBe(mockedGames[0].title);
  });
});
