import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import evolve from 'ramda/src/evolve'
import not from 'ramda/src/not'

import './styles.css'
import GamesList from './Components/List'
import GameForm from './Components/Form'

import { Button } from '../../Shared/Components/Controls/Button'

export class GamesConatainer extends React.Component {
  state = {
    modal: false
  }

  navigateToGame = id =>
    this.props.history.replace(`/game/${this.props.userLogin}/${id}`)

  toggleModalWindow = () => this.setState(evolve({ modal: not }))

  render() {
    return (
      <div className="Games-container">
        {this.state.modal
          ? <GameForm onClose={this.toggleModalWindow} />
          : null}
        <div className="Games-title">
          <h1>Your games</h1>
        </div>
        <Button onClick={this.toggleModalWindow}>Add Game</Button>
        <GamesList onNavigateToTask={this.navigateToGame} />
      </div>
    )
  }
}

GamesConatainer.propTypes = {
  history: PropTypes.object.isRequired,
  userLogin: PropTypes.string
}

const mapStateToProps = state => ({
  userLogin: state.user.login
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(GamesConatainer)
