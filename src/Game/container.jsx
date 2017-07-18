import React from 'react';
import PropTypes from 'prop-types';

import StoriesContainer from '../Stories/container';
import PlayersContainer from '../Player/container';
import DeckContainer from '../Deck/container';
import TableContainer from '../Table/container';

import { connect } from 'react-redux';
import { find, propEq, isNil, evolve, T, F } from 'ramda';
import { fetchGame, findGameById } from '../Games/reducer';
import { Modal } from '../Modal/container';
import { addUnauthorizedUser } from '../Auth/actions.js';
import socketConst from '../../server/controllers/socket.constants.js';
import { FlexContainer, FlexItem } from '../utils/FlexContainer';
import { leaveRoom } from '../Player/reducer.js';
import { FormGroup } from '../Controls/formgroup';
import { Label } from '../Controls/label';
import { Button } from '../Controls/Button';
import { Input } from '../Controls/input';

const showModal = evolve({ modal: T });
const hideModal = evolve({ modal: F });

export class GameContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      isAdmin: !!(
        this.props.user.login &&
        this.props.match.params.user === this.props.user.login
      )
    };
    this.emitted = false;
  }

  componentDidMount() {
    this.props.fetchGame({
      login: this.props.match.params.user,
      gameID: this.props.match.params.gameID
    });
    this.checkIfUserIsLoggedIn();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.gameID !== nextProps.match.params.gameID) {
      this.props.fetchGame({
        login: this.props.match.params.user,
        gameID: nextProps.match.params.gameID
      });
    }
    if (!isNil(nextProps.user.login) && !this.emitted) {
      this.props.enterRoom({
        gameID: nextProps.match.params.gameID,
        user: nextProps.user
      });
      this.emitted = true;
    }
  }

  componentWillUnmount() {
    this.props.leaveRoom();
  }

  checkIfUserIsLoggedIn() {
    if (isNil(this.props.user.login)) {
      this.setState(showModal);
    }
  }

  toggleModalWindow() {
    this.setState(hideModal);
  }
  onSubmit = e => {
    e.preventDefault();
    const login = this.loginInput.value;

    this.props.addUnauthorizedUser({ login });
    this.toggleModalWindow();
  };

  render() {
    const { game } = this.props;
    if (!game) return <h1>No game</h1>;
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
    );
  }
}

GameContainer.propTypes = {
  game: PropTypes.object,
  user: PropTypes.object,
  fetchGame: PropTypes.func,
  addUnauthorizedUser: PropTypes.func,
  enterRoom: PropTypes.func
};

const mapStateToProps = (state, { match }) => ({
  game: findGameById(match.params.gameID, state.games),
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  fetchGame: props => dispatch(fetchGame(props)),
  addUnauthorizedUser: user => dispatch(addUnauthorizedUser(user)),
  leaveRoom: () => dispatch(leaveRoom()),
  enterRoom: payload =>
    dispatch({
      type: socketConst.ENTER_ROOM,
      payload
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
