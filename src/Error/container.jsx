import React from 'react';
import { connect } from 'react-redux';
import { setErrorMessage } from './reducer';
import { ErrorComponent } from './component';

export const ErrorContainer = ({ error, setErrorMessage }) => {
  const displayError = error => {
    setTimeout(() => setErrorMessage(null), 3000);
    return <ErrorComponent error={error} />;
  };
  return (
    <div>
      {error && displayError(error)}
    </div>
  );
};

const mapStateToProp = state => ({
  error: state.error
});

const mapDispatchToProps = { setErrorMessage };

export default connect(mapStateToProp, mapDispatchToProps)(ErrorContainer);
