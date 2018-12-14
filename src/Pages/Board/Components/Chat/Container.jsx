import React, { useContext, useState } from 'react';

import { ChatInputArea } from './Input';
import { ChatThreads } from './Threads';
import { ChatWindow } from './Window';
import { AuthContext } from '../../../../Data/Auth/AuthContext';
import { useSocket } from '../../../../utils/hooks/useSocket';

export default function ChatContainer() {
    const user = useContext(AuthContext);
    const [messages, addMessage] = useState([]);
    const emitMessage = useSocket(['[sockets] BROADCAST_MESSAGE'], data => {
        addMessage(prevMessages => [...prevMessages, data.payload]);
    });
    const sendMessage = message => emitMessage({ type: '[sockets] MESSAGE_RECEIVED', payload: { user, message } });
    return (
        <ChatWindow>
            <ChatThreads threads={messages} />
            <ChatInputArea onSendMessage={sendMessage} />
        </ChatWindow>
    );
}
