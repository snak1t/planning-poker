import React from 'react';
import { Player } from '../../../../Data/PlaySession/PlayRoomContext';
import { Table } from 'antd';
import { comparator } from '../Deck/deck';
import { ColumnProps } from 'antd/lib/table';

type Props = {
    players: Player[];
};
const columns: ColumnProps<Player>[] = [
    {
        title: 'Player',
        dataIndex: 'info.login',
        sorter: (a: Player, b: Player) => a.info.login.localeCompare(b.info.login),
    },
    {
        title: 'Story Points',
        dataIndex: 'score',
        defaultSortOrder: 'ascend',
        sorter: (a: Player, b: Player) => comparator(a.score, b.score),
    },
];
export const TableResult: React.SFC<Props> = ({ players }) => {
    return (
        <div>
            <Table dataSource={players} columns={columns} pagination={false} />
        </div>
    );
};
