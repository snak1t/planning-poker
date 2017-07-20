import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { isNil, evolve, T, F } from 'ramda'

import StoriesContainer from './Components/Stories/Container'
import PlayersContainer from './Components/Player/Container'
import DeckContainer from './Components/Deck/Container'
import TableContainer from './Components/Table/Container'
import { Modal } from '../../Shared/Components/Modal/Container'

import { fetchGame, findGameById } from '../../Data/Games/reducer'
import { leaveRoom } from '../../Data/PlaySession/reducer.js'
import { addUnauthorizedUser } from '../../Data/Auth/actions'
import socketConst from '../../socket.constants.js'
import { FlexContainer, FlexItem } from '../../utils/FlexContainer'
import { FormGroup } from '../../Shared/Components/Controls/Form.group'
import { Label } from '../../Shared/Components/Controls/Label'
import { Button } from '../../Shared/Components/Controls/Button'
import { Input } from '../../Shared/Components/Controls/Input'

const showModal = evolve({ modal: T })
const hideModal = evolve({ modal: F })

export class BoardContainer extends React.Component {
  state = {
    modal: false,
    isAdmin: !!(
      this.props.user.login &&
      this.props.match.params.user === this.props.user.login
    )
  }
  emitted = false

  componentDidMount() {
    this.props.fetchGame({
      login: this.props.match.params.user,
      gameID: this.props.match.params.gameID
    })
    this.checkIfUserIsLoggedIn()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.gameID !== nextProps.match.params.gameID) {
      this.props.fetchGame({
        login: this.props.match.params.user,
        gameID: nextProps.match.params.gameID
      })
    }
    if (!isNil(nextProps.user.login) && !this.emitted) {
      this.props.enterRoom({
        gameID: nextProps.match.params.gameID,
        user: nextProps.user
      })
      this.emitted = true
    }
  }

  componentWillUnmount() {
    this.props.leaveRoom()
  }

  checkIfUserIsLoggedIn() {
    if (isNil(this.props.user.login)) {
      this.setState(showModal)
    }
  }

  toggleModalWindow() {
    this.setState(hideModal)
  }
  onSubmit = e => {
    e.preventDefault()
    const login = this.loginInput.value

    this.props.addUnauthorizedUser({ login })
    this.toggleModalWindow()
  }

  render() {
    const { game } = this.props
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
        <FlexItem asContainer grow="1">
          <StoriesContainer admin={this.state.isAdmin} />
          <FlexItem grow="1">
            <TableContainer admin={this.state.isAdmin} />
          </FlexItem>
          <FlexItem basis="340px" style={{ position: 'relative' }}>
            <PlayersContainer />
          </FlexItem>
        </FlexItem>
        <FlexItem basis="20vh">
          <DeckContainer />
        </FlexItem>

        {this.state.modal
          ? <Modal
              title="Please, enter your name"
              onClose={() => this.toggleModalWindow()}
            >
              <form onSubmit={this.onSubmit}>
                <FormGroup>
                  <Label htmlFor="login">Your Login</Label>
                  <Input
                    id="login"
                    name="login"
                    type="text"
                    innerRef={element => (this.loginInput = element)}
                    placeholder="Your desired login"
                  />
                </FormGroup>
                <FormGroup>
                  <Button primary type="submit">
                    Enter room
                  </Button>
                </FormGroup>
              </form>
            </Modal>
          : null}
      </FlexContainer>
    )
  }
}

BoardContainer.propTypes = {
  game: PropTypes.object,
  user: PropTypes.object,
  fetchGame: PropTypes.func,
  addUnauthorizedUser: PropTypes.func,
  enterRoom: PropTypes.func
}

const mapStateToProps = (state, { match }) => ({
  game: findGameById(match.params.gameID, state.games),
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  fetchGame: props => dispatch(fetchGame(props)),
  addUnauthorizedUser: user => dispatch(addUnauthorizedUser(user)),
  leaveRoom: () => dispatch(leaveRoom()),
  enterRoom: payload =>
    dispatch({
      type: socketConst.ENTER_ROOM,
      payload
    })
})

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer)
