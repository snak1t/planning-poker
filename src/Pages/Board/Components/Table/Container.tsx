import React, { useContext } from 'react';
import { Divider } from 'antd';

import { PlayRoomContext } from '../../../../Data/PlaySession/PlayRoomContext';
import { calculateAverage } from '../../../../utils/average.score';
import { TableResult } from '../RoundResults/TableResult';

export function TableContainer() {
    const { isRevealing, players, currentStory } = useContext(PlayRoomContext);

    if (currentStory === '' || currentStory === null || !isRevealing) return null;
    return (
        <>
            <Divider>Average Score is {calculateAverage(players)}</Divider>
            <TableResult players={players} />
        </>
    );
}
