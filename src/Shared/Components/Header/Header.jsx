import React from 'react';
import { SimpleLink } from '../Controls/Navigation.link';
import QuickGame from '../Game/Quick.game';
import { doLogout } from '../../../Data/Auth/actions.js';
import { connect } from 'react-redux';
import { isUserLoggedIn } from '../../../Data/Auth';

import { HeaderDiv, Title } from './atoms';

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
        <Title>
            <SimpleLink to="/">Free Planning Poker</SimpleLink>
        </Title>
        {isLoggedIn ? <button onClick={doLogout}>Logout</button> : null}
        <QuickGame />
    </HeaderDiv>
);

export default enhancer(Header);
