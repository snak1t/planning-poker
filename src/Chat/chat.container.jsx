import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { emitMessage } from './actions.js';
import { ChatInputArea } from './inputArea';
import { ChatThreads } from './threads';
import { ChatWindow } from './chat.window';

const mapStateToProps = state => ({
  messages: state.chatMessages,
  user: state.user
});

const mapDispatchToProps = {
  addMessage: emitMessage
};

export const ChatContainer = ({ user, messages, addMessage }) =>
  <ChatWindow>
    <ChatThreads threads={messages} />
    <ChatInputArea onSendMessage={message => addMessage({ user, message })} />
  </ChatWindow>;

ChatContainer.propTypes = {
  user: PropTypes.shape({
    login: PropTypes.string
  }),
  addMessage: PropTypes.func.isRequired,
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.shape({
        login: PropTypes.string.isRequired
      }),
      message: PropTypes.string.isRequired
    })
  )
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);
