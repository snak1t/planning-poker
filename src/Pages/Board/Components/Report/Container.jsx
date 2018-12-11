import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Button } from '../../../../Shared/Components/Controls';
import { Report } from './Component';
import { getAllStories } from '../../../../Data/Stories/reducer';

export function ReportContainer({ game, stories }) {
    const [reportVisibilityStatus, setReportVisibilityStatus] = useState(false);

    const prepareReport = () => setReportVisibilityStatus(true);
    const closeReport = () => setReportVisibilityStatus(false);

    return (
        <div style={{ textAlign: 'center' }}>
            <Button outline onClick={prepareReport}>
                Show Report
            </Button>
            {reportVisibilityStatus ? <Report game={game} stories={stories} onClose={closeReport} /> : null}
        </div>
    );
}

const mapStateToProp = (store, props) => ({
    game: store.games.find(g => g._id === props.match.params.gameID),
    stories: getAllStories(store),
});

const mapDispatchToProps = {};

export default withRouter(
    connect(
        mapStateToProp,
        mapDispatchToProps,
    )(ReportContainer),
);
