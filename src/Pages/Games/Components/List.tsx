import React, { useContext } from 'react';
import '../styles.css';
import { GamesWrapper } from '../atoms';
import { GamesContext, Game } from '../../../Data/Games/GamesContext';
import { Table, Button } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { AuthContext } from '../../../Data/Auth/AuthContext';
import { Link } from 'react-router-dom';

export const GamesList: React.SFC<{}> = () => {
    const { games, removeGame } = useContext(GamesContext);
    const { user } = useContext(AuthContext);

    const columns: ColumnProps<Game>[] = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (text, gameItem) => {
                return <Link to={`/game/${user.info.email}/${gameItem.id}`}>{text}</Link>;
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
            render: (text: string, gameItem: Game) => <span>{gameItem.isCompleted ? 'Yes' : 'No'}</span>,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text: string, gameItem: Game) => (
                <Button.Group>
                    <Button>Edit</Button>
                    <Button
                        onClick={() => {
                            removeGame(gameItem.id);
                        }}
                    >
                        Remove
                    </Button>
                </Button.Group>
            ),
        },
    ];
    return (
        <GamesWrapper>
            {games.length === 0 ? (
                'No games yet'
            ) : (
                <Table
                    rowKey="id"
                    expandedRowRender={record => (
                        <p style={{ margin: 0 }}>{record.description || 'No description for game provided'}</p>
                    )}
                    columns={columns}
                    dataSource={games}
                />
            )}
        </GamesWrapper>
    );
};
