import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledDiv = styled.div`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border-top: 3px solid #00897b;
`;

export const ChatInputArea = ({ onSendMessage }) => {
  let textInput = null;
  const handleKeyDown = event => {
    if (event.charCode === 13) {
      return handleSubmit(textInput.value);
    }
  };
  const handleSubmit = message => {
    if (message === '') return;
    textInput.value = '';
    return onSendMessage(message);
  };
  return (
    <StyledDiv>
      <input
        type="text"
        name="chat"
        ref={input => (textInput = input)}
        onKeyPress={handleKeyDown}
      />
      <button onClick={() => handleSubmit(textInput.value)}>Send</button>
    </StyledDiv>
  );
};

ChatInputArea.propTypes = {
  onSendMessage: PropTypes.func.isRequired
};
