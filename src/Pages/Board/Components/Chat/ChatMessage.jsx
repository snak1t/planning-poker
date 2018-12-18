import React from 'react';
import PropTypes from 'prop-types';
import { List, Avatar } from 'antd';

export const ChatMessage = ({ user, message, style }) => {
    return (
        <List.Item style={style}>
            <List.Item.Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={user.login}
                description={message}
            />
        </List.Item>
    );
};

ChatMessage.propTypes = {
    user: PropTypes.shape({
        login: PropTypes.string.isRequired,
    }),
    message: PropTypes.string.isRequired,
};
