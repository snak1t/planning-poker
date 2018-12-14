import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { emitMessage } from '../../../../Data/Chat/actions';
import { ChatInputArea } from './Input';
import { ChatThreads } from './Threads';
import { ChatWindow } from './Window';
import { AuthContext } from '../../../../Data/Auth/AuthContext';

const mapStateToProps = state => ({
    messages: state.chatMessages,
});

const mapDispatchToProps = {
    addMessage: emitMessage,
};

export const ChatContainer = ({ messages, addMessage }) => {
    const user = useContext(AuthContext);
    return (
        <ChatWindow>
            <ChatThreads threads={messages} />
            <ChatInputArea onSendMessage={message => addMessage({ user, message })} />
        </ChatWindow>
    );
};

ChatContainer.propTypes = {
    addMessage: PropTypes.func.isRequired,
    messages: PropTypes.arrayOf(
        PropTypes.shape({
            user: PropTypes.shape({
                login: PropTypes.string.isRequired,
            }),
            message: PropTypes.string.isRequired,
        }),
    ),
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ChatContainer);
