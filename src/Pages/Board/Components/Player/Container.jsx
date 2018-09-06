import React from 'react';
import { connect } from 'react-redux';
import pick from 'ramda/src/pick';

import ChatContainer from '../Chat/Container';
import PlayersList from './PlayersList';

export const PlayersContainer = ({ playSession: { scores } }) => {
    return (
        <React.Fragment>
            <PlayersList players={scores} />
            <ChatContainer />
        </React.Fragment>
    );
};

const mapStateToProps = pick(['playSession']);

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PlayersContainer);
