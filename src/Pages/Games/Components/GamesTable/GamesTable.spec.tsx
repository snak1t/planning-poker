import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import { GamesTable } from './GamesTable';
import { Game } from '../../../../Data/Games/GamesContext';
import { MemoryRouter } from 'react-router';
import { EditedGameProvider } from '../EditedGameContext/EditedGameContext';

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

describe('<GamesTable:', () => {
  afterEach(cleanup);
  let getLinkUrl: (id: string) => string;
  let onRemoveGame: (id: string) => void;
  let onEditGame: (id: string) => void;
  let onCancelEditing: () => void;
  beforeEach(() => {
    getLinkUrl = jest
      .fn()
      .mockName('getLinkUrl')
      .mockReturnValue('/some-link');
    onRemoveGame = jest.fn().mockName('onRemoveGame');
    onEditGame = jest.fn().mockName('onEditGame');
    onCancelEditing = jest.fn().mockName('onCancelEditing');
  });

  it('should be rendered', () => {
    const { container } = render(
      <MemoryRouter>
        <GamesTable
          onSetGameForEdit={onEditGame}
          onCancelEditing={onCancelEditing}
          games={mockedGames}
          getLinkUrl={getLinkUrl}
          onRemoveGame={onRemoveGame}
        />
      </MemoryRouter>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render links', () => {
    render(
      <MemoryRouter>
        <GamesTable
          onSetGameForEdit={onEditGame}
          onCancelEditing={onCancelEditing}
          games={mockedGames}
          getLinkUrl={getLinkUrl}
          onRemoveGame={onRemoveGame}
        />
      </MemoryRouter>,
    );
    expect(getLinkUrl).toHaveBeenCalledTimes(2);
    expect(getLinkUrl).toHaveBeenLastCalledWith(mockedGames[1].id);
  });

  it('should render two titles in normal mode', () => {
    const { getAllByTestId } = render(
      <MemoryRouter>
        <EditedGameProvider game={null} onSubmit={() => {}}>
          <GamesTable
            onSetGameForEdit={onEditGame}
            onCancelEditing={onCancelEditing}
            games={mockedGames}
            getLinkUrl={getLinkUrl}
            onRemoveGame={onRemoveGame}
          />
        </EditedGameProvider>
      </MemoryRouter>,
    );

    const gameTitles = getAllByTestId('game-title');
    expect(gameTitles.length).toBe(2);
  });

  it('should correctly remove game on clicking', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <EditedGameProvider game={null} onSubmit={() => {}}>
          <GamesTable
            onSetGameForEdit={onEditGame}
            onCancelEditing={onCancelEditing}
            games={mockedGames.slice(0, 1)}
            getLinkUrl={getLinkUrl}
            onRemoveGame={onRemoveGame}
          />
        </EditedGameProvider>
      </MemoryRouter>,
    );

    const deleteBtn = getByTestId('game-remove-btn');

    fireEvent.click(deleteBtn);
    expect(onRemoveGame).toHaveBeenCalled();
    expect(onRemoveGame).toHaveBeenCalledWith(mockedGames[0].id);
  });

  it('should call onSetEditGame when Edit button is clicked', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <EditedGameProvider game={null} onSubmit={() => {}}>
          <GamesTable
            onSetGameForEdit={onEditGame}
            onCancelEditing={onCancelEditing}
            games={mockedGames.slice(0, 1)}
            getLinkUrl={getLinkUrl}
            onRemoveGame={onRemoveGame}
          />
        </EditedGameProvider>
      </MemoryRouter>,
    );

    const editBtn = getByTestId('game-edit-btn');

    fireEvent.click(editBtn);
    expect(onEditGame).toHaveBeenCalled();
    expect(onEditGame).toHaveBeenCalledWith(mockedGames[0].id);
  });

  it('should render input elements and submit button for edited field', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <EditedGameProvider game={mockedGames[0]} onSubmit={() => {}}>
          <GamesTable
            onSetGameForEdit={onEditGame}
            onCancelEditing={onCancelEditing}
            games={mockedGames.slice(0, 1)}
            getLinkUrl={getLinkUrl}
            onRemoveGame={onRemoveGame}
          />
        </EditedGameProvider>
      </MemoryRouter>,
    );
    const titleInput = getByTestId('game-title-input') as HTMLInputElement;
    expect(titleInput).toBeDefined();
    expect(titleInput.value).toBe(mockedGames[0].title);

    const descriptionInput = getByTestId(
      'game-description-input',
    ) as HTMLInputElement;
    expect(descriptionInput).toBeDefined();
    expect(descriptionInput.value).toBe(mockedGames[0].description);

    expect(getByTestId('game-submit-button')).toBeDefined();
  });

  it('should render one title if one of the game is in edit mode', () => {
    const { getAllByTestId } = render(
      <MemoryRouter>
        <EditedGameProvider game={mockedGames[0]} onSubmit={() => {}}>
          <GamesTable
            onSetGameForEdit={onEditGame}
            onCancelEditing={onCancelEditing}
            games={mockedGames}
            getLinkUrl={getLinkUrl}
            onRemoveGame={onRemoveGame}
          />
        </EditedGameProvider>
      </MemoryRouter>,
    );

    const gameTitles = getAllByTestId('game-title');
    expect(gameTitles.length).toBe(1);
  });

  it('should not render edit button for already played game', () => {
    const { queryByText } = render(
      <MemoryRouter>
        <EditedGameProvider game={null} onSubmit={() => {}}>
          <GamesTable
            onSetGameForEdit={onEditGame}
            onCancelEditing={onCancelEditing}
            games={mockedGames.slice(-1)}
            getLinkUrl={getLinkUrl}
            onRemoveGame={onRemoveGame}
          />
        </EditedGameProvider>
      </MemoryRouter>,
    );

    expect(queryByText('Edit')).toBeNull();
  });
});
