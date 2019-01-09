import React, { useContext } from 'react';
import { Game } from '../../../../Data/Games/GamesContext';
import { Table, Button, Input } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { Link } from 'react-router-dom';
import { EditedGameContext } from '../EditedGameContext/EditedGameContext';

type Props = {
  games: Game[];
  getLinkUrl: (id: string) => string;
  onRemoveGame: (id: string) => void;
  onSetGameForEdit: (id: string) => void;
  onCancelEditing: () => void;
};

export const GamesTable: React.SFC<Props> = ({
  games,
  getLinkUrl,
  onRemoveGame,
  onSetGameForEdit,
  onCancelEditing,
}) => {
  const { game: editedGame, updateField, submitGame } = useContext(
    EditedGameContext,
  );
  const columns: ColumnProps<Game>[] = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text, gameItem) => {
        if (editedGame && gameItem.id === editedGame.id) {
          return (
            <Input
              value={editedGame.title}
              onChange={event => updateField('title', event.target.value)}
              data-testid="game-title-input"
            />
          );
        }
        return (
          <Link to={getLinkUrl(gameItem.id)}>
            <span data-testid="game-title">{text}</span>
          </Link>
        );
      },
    },
    {
      title: 'Amount of stories',
      dataIndex: 'storiesCount',
      key: 'storiesCount',
    },
    {
      title: 'Game Completed?',
      dataIndex: 'isCompleted',
      key: 'isCompleted',
      render: (text: string, gameItem: Game) => (
        <span>{gameItem.isCompleted ? 'Yes' : 'No'}</span>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, gameItem: Game) => (
        <Button.Group>
          {editedGame && editedGame.id === gameItem.id ? (
            <>
              <Button
                type="primary"
                onClick={submitGame}
                data-testid="game-submit-button"
              >
                Update game
              </Button>
              <Button
                onClick={onCancelEditing}
                data-testid="game-cancel-edit-btn"
              >
                Cancel
              </Button>
            </>
          ) : (
            <>
              {gameItem.isCompleted ? null : (
                <Button
                  onClick={() => {
                    onSetGameForEdit(gameItem.id);
                  }}
                  data-testid="game-edit-btn"
                >
                  Edit
                </Button>
              )}
              <Button
                onClick={() => {
                  onRemoveGame(gameItem.id);
                }}
                data-testid="game-remove-btn"
              >
                Remove
              </Button>
            </>
          )}
        </Button.Group>
      ),
    },
  ];
  return (
    <Table
      rowKey="id"
      defaultExpandAllRows={true}
      expandedRowRender={(record: Game) =>
        editedGame && editedGame.id === record.id ? (
          <Input
            data-testid="game-description-input"
            value={editedGame.description}
            onChange={event => updateField('description', event.target.value)}
          />
        ) : (
          <p style={{ margin: 0 }}>
            {record.description || 'No description for game provided'}
          </p>
        )
      }
      columns={columns}
      dataSource={games}
    />
  );
};
