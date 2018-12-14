import React from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';

import { setErrorMessage } from '../../../Data/Error/reducer';

export const ErrorContainer = ({ error, setErrorMessage }) => {
    React.useEffect(
        async () => {
            if (error) {
                await message.error(error, 3);
                setErrorMessage(null);
            }
        },
        [error],
    );
    return null;
};

const mapStateToProp = state => ({
    error: state.error,
});

const mapDispatchToProps = { setErrorMessage };

export default connect(
    mapStateToProp,
    mapDispatchToProps,
)(ErrorContainer);
