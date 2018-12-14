import { useEffect } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';

import { setErrorMessage } from '../../../Data/Error/reducer';

export const ErrorContainer = ({ error, setErrorMessage }) => {
    useEffect(
        () => {
            if (error) {
                message.error(error, 3).then(() => {
                    setErrorMessage(null);
                });
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
