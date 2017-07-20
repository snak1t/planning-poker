import React from 'react'
import { connect } from 'react-redux'
import { pick, map, addIndex } from 'ramda'
import ChatContainer from '../Chat/chat.container'
const indexedMap = addIndex(map)

export const PlayersContainer = ({ playSession: { scores } }) => {
  const displayPlayers = indexedMap((p, id) =>
    <li key={id}>
      User = {p.user}, score = {JSON.stringify(p.score)}
    </li>
  )
  return (
    <div>
      <ul>
        {displayPlayers(scores)}
      </ul>
      <ChatContainer />
    </div>
  )
}

const mapStateToProps = pick(['playSession'])

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(PlayersContainer)
