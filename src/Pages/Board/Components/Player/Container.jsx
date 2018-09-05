import React from 'react';
import { connect } from 'react-redux';
import pick from 'ramda/src/pick';

import ChatContainer from '../Chat/Container';
import PlayersList from './PlayersList';

export const PlayersContainer = ({ playSession: { scores } }) => {
    return (
        <div>
            <PlayersList players={scores} />
            <ChatContainer />
        </div>
    );
};

const mapStateToProps = pick(['playSession']);

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PlayersContainer);
