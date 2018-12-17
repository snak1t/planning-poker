import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Report } from './Component';
import { getAllStories } from '../../../../Data/Stories/reducer';
import { useCurrentGame } from '../../../../Data/Games/GamesContext';
import { Icon } from 'antd';

export function ReportContainer({ stories, match: { params } }) {
    const [reportVisibilityStatus, setReportVisibilityStatus] = useState(false);
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

const mapStateToProp = store => ({
    stories: getAllStories(store),
});

export default withRouter(connect(mapStateToProp)(ReportContainer));
