import React from 'react'
import { connect } from 'react-redux'
import map from 'ramda/src/map'
import addIndex from 'ramda/src/addIndex'
import '../styles.css'
import { GameItem } from './Item'
import { deleteGame } from '../../../Data/Games/reducer'

const indexedMap = addIndex(map)

export const GamesList = ({ games, onNavigateToTask, deleteGame }) => {
  const displayGamesList = indexedMap((game, idx) => {
    return (
      <GameItem
        key={idx}
        {...game}
        onNavigateToTask={onNavigateToTask}
        onDeleteGame={gameID => deleteGame({ gameID })}
      />
    )
  })
  return (
    <section className="Games-list">
      {games.length === 0 ? 'No games yet' : displayGamesList(games)}
    </section>
  )
}

const mapStateToProps = state => ({
  games: state.games
})

const mapDispatchToProps = { deleteGame }

export default connect(mapStateToProps, mapDispatchToProps)(GamesList)
