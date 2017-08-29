import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  branch,
  compose as composeHOC,
  renderComponent,
  lifecycle
} from 'recompose'

import DeckContainer from './Components/Deck/Container'
import TableContainer from './Components/Table/Container'
import PlayersContainer from './Components/Player/Container'
import StoriesContainer from './Components/Stories/Container'
import { TemporaryLoginForm } from './Components/Player/ModalForm'

import { leaveRoom } from '../../Data/PlaySession/reducer.js'
import { addUnauthorizedUser, isAdmin, enterRoom } from '../../Data/Auth'
import { fetchGame, findGameById } from '../../Data/Games/reducer'
import { FlexContainer, FlexItem } from '../../utils/FlexContainer'

const mapStateToProps = (state, { match: { params } }) => ({
  game: findGameById(params.gameID, state.games),
  isAdmin: isAdmin(state, params.user),
  user: state.user
})

const mapDispatchToProps = {
  fetchGame,
  addUnauthorizedUser,
  leaveRoom,
  enterRoom
}

const MainContainer = FlexItem.extend`
  min-height: 400px;
`

const enhancer = composeHOC(
  connect(mapStateToProps, mapDispatchToProps),
  branch(
    ({ user: { logStatus } }) => logStatus !== 'LOGGED_IN',
    renderComponent(TemporaryLoginForm)
  ),
  lifecycle({
    componentDidMount() {
      const { user, gameID } = this.props.match.params
      this.props.fetchGame({
        login: user,
        gameID: gameID
      })
      this.props.enterRoom({
        gameID: gameID,
        user: this.props.user
      })
    },
    componentWillReceiveProps(nextProps) {
      if (this.props.match.params.gameID !== nextProps.match.params.gameID) {
        this.props.fetchGame({
          login: this.props.match.params.user,
          gameID: nextProps.match.params.gameID
        })
      }
    },
    componentWillUnmount() {
      this.props.leaveRoom()
    }
  })
)

export const BoardContainer = ({ game, isAdmin }) => {
  if (!game) return <h1>No game</h1>
  return (
    <FlexContainer vertical justify="center">
      <FlexItem basis="64px">
        <header>
          <h2>
            {game.title}
          </h2>
        </header>
      </FlexItem>
      <MainContainer asContainer grow="1">
        <StoriesContainer admin={isAdmin} />
        <FlexItem grow="1">
          <TableContainer admin={isAdmin} />
        </FlexItem>
        <FlexItem basis="340px" style={{ position: 'relative' }}>
          <PlayersContainer />
        </FlexItem>
      </MainContainer>
      <FlexItem basis="20vh">
        <DeckContainer />
      </FlexItem>
    </FlexContainer>
  )
}

BoardContainer.propTypes = {
  game: PropTypes.object,
  user: PropTypes.object,
  fetchGame: PropTypes.func,
  addUnauthorizedUser: PropTypes.func,
  enterRoom: PropTypes.func
}

export default enhancer(BoardContainer)
