import React from 'react'
import PropTypes from 'prop-types'
import { List, AutoSizer } from 'react-virtualized'

import { ChatMessage } from './Message'

export const ChatThreads = ({ threads }) => {
  const renderRow = ({ index, isScrolling, key, style }) => {
    return (
      <div key={key} style={style}>
        <ChatMessage {...threads[index]} />
      </div>
    )
  }

  return (
    <div style={{ height: '300px' }}>
      <AutoSizer>
        {({ width, height }) =>
          <List
            rowCount={threads.length}
            width={width}
            height={height}
            rowHeight={30}
            rowRenderer={renderRow}
            scrollToIndex={threads.length - 1}
          />}
      </AutoSizer>
    </div>
  )
}

ChatThreads.propTypes = {
  threads: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.shape({
        login: PropTypes.string.isRequired
      }),
      message: PropTypes.string.isRequired
    })
  )
}
