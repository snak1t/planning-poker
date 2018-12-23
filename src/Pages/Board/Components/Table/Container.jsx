import React, { useContext } from 'react';
import { Divider } from 'antd';

import { PlayRoomContext } from '../../../../Data/PlaySession/PlayRoomContext';
import { calculateAverage } from '../../../../utils/average.score';

export function TableContainer() {
    const { scores, isRevealing, currentStory } = useContext(PlayRoomContext);

    if (currentStory === '' || currentStory === null) return null;
    return (
        <section style={{ margin: '0 10px' }}>
            {isRevealing ? <Divider>Average Score is {calculateAverage(scores)}</Divider> : null}
        </section>
    );
}
