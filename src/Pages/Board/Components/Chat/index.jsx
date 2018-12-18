import React, { useContext, useState } from 'react';
import { Drawer, Button } from 'antd';

import { ChatInputArea } from './ChatInputArea';
import { ChatThread } from './ChatThread';
import { AuthContext } from '../../../../Data/Auth/AuthContext';
import { useSocket } from '../../../../utils/hooks/useSocket';
import { ChatButton } from './atoms';

export function Chat() {
    const user = useContext(AuthContext);
    const [messages, addMessage] = useState([]);
    const [isOpened, setOpen] = useState(false);
    const [unreadMessages, setUnreadMessages] = useState(messages.length);
    if (isOpened && unreadMessages !== 0) {
        setUnreadMessages(0);
    }
    const emitMessage = useSocket(['[sockets] BROADCAST_MESSAGE'], data => {
        addMessage(prevMessages => {
            setUnreadMessages(prev => prev + 1);
            return [...prevMessages, data.payload];
        });
    });
    const sendMessage = message => emitMessage({ type: '[sockets] MESSAGE_RECEIVED', payload: { user, message } });
    return (
        <>
            <ChatButton count={unreadMessages}>
                <Button onClick={() => setOpen(true)} type="primary" shape="circle" icon="message" size="large" />
            </ChatButton>
            <Drawer
                width={520}
                placement="right"
                closable={false}
                onClose={() => setOpen(false)}
                visible={isOpened}
                mask={true}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                }}
            >
                <ChatThread threads={messages} />
                <ChatInputArea onSendMessage={sendMessage} />
            </Drawer>
        </>
    );
}
