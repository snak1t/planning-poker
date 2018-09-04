import React from 'react';
import QuickGame from '../Game/Quick.game';
import { doLogout } from '../../../Data/Auth/actions.js';
import { connect } from 'react-redux';
import { isUserLoggedIn } from '../../../Data/Auth';

import { HeaderDiv } from './atoms';

const mapStateToProps = state => ({
    isLoggedIn: isUserLoggedIn(state),
});

const mapDispatchToProps = {
    doLogout,
};

const enhancer = connect(
    mapStateToProps,
    mapDispatchToProps
);

export const Header = ({ doLogout, isLoggedIn }) => (
    <HeaderDiv>
        {isLoggedIn ? <button onClick={doLogout}>Logout</button> : null}
        <QuickGame />
    </HeaderDiv>
);

export default enhancer(Header);
