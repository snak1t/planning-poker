import React from 'react'
import { connect } from 'react-redux'
import pick from 'ramda/src/pick'
import map from 'ramda/src/map'
import addIndex from 'ramda/src/addIndex'

import ChatContainer from '../Chat/Container'
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
