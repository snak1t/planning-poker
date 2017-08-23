import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { 
  Input,
  Button 
} from '../../../../Shared/Components/Controls'

const StyledDiv = styled.div`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border-top: 3px solid #00897b;
`;

const SendButton = Button.extend`
  border-color: #0060b3;
  border-radius: 0px;
  padding: 4px 20px;
  color: #0060b3;
  &:hover {
    background-color: #0060b3;
    box-shadow: 0 0 2px 1px #0060b3;
  }
`

const MessageInput = Input.extend`
  width: 65%;
  margin-right: 18px;
  border-color: #0060b3;
  color: #0060b3;
`

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
      <MessageInput
        type="text"
        name="chat"
        innerRef={input => (textInput = input)}
        onKeyPress={handleKeyDown}
      />
      <SendButton onClick={() => handleSubmit(textInput.value)}>Send</SendButton>
    </StyledDiv>
  );
};

ChatInputArea.propTypes = {
  onSendMessage: PropTypes.func.isRequired
};
