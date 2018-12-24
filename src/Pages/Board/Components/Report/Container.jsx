import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';

import { Report } from './Component';
import { useCurrentGame } from '../../../../Data/Games/GamesContext';
import { Icon } from 'antd';
import { StoriesContext } from '../../../../Data/Stories/StoriesContext';

export function ReportContainer({ match: { params } }) {
    const [reportVisibilityStatus, setReportVisibilityStatus] = useState(false);
    const { stories } = useContext(StoriesContext);
    const game = useCurrentGame(params.gameID);

    const prepareReport = () => setReportVisibilityStatus(true);
    const closeReport = () => setReportVisibilityStatus(false);

    return (
        <>
            <Icon type="printer" onClick={prepareReport} />
            {reportVisibilityStatus ? <Report game={game} stories={stories} onClose={closeReport} /> : null}
        </>
    );
}

export default withRouter(ReportContainer);
