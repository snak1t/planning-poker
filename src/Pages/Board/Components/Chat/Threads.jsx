import React from 'react';
import PropTypes from 'prop-types';
import { List, AutoSizer } from 'react-virtualized';

import { ChatMessage } from './Message';

export const ChatThreads = ({ threads }) => {
    const renderRow = ({ index, key, style }) => {
        return <ChatMessage {...threads[index]} key={key} style={style} />;
    };

    const getRowHeight = ({ index }) => {
        const { message } = threads[index];
        const messageLength = message.length;
        return 60 + (Math.floor(messageLength / 50) + 1) * 20;
    };

    return (
        <div style={{ height: '300px' }}>
            <AutoSizer>
                {({ width, height }) => (
                    <List
                        rowCount={threads.length}
                        width={width}
                        height={height}
                        rowHeight={getRowHeight}
                        rowRenderer={renderRow}
                        scrollToIndex={threads.length - 1}
                    />
                )}
            </AutoSizer>
        </div>
    );
};

ChatThreads.propTypes = {
    threads: PropTypes.arrayOf(
        PropTypes.shape({
            user: PropTypes.shape({
                login: PropTypes.string.isRequired,
            }),
            message: PropTypes.string.isRequired,
        }),
    ),
};
