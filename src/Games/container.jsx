import React from 'react';
import PropTypes from 'prop-types';
import GamesList from './list';
import { connect } from 'react-redux';
import styles from './styles.css';
import { Route, Link } from 'react-router-dom';
import { evolve, not } from 'ramda';
import GameForm from './form';

export class GamesConatainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }

  navigateToGame(id) {
    this.props.history.replace(`/game/${this.props.userLogin}/${id}`);
  }

  toggleModalWindow() {
    this.setState(evolve({ modal: not }));
  }

  render() {
    return (
      <div className={styles.container}>
        {this.state.modal
          ? <GameForm onClose={() => this.toggleModalWindow()} />
          : null}
        <div className={styles.title}>
          <h1>Your games</h1>
        </div>
        <button onClick={() => this.toggleModalWindow()}>Add Form</button>
        <GamesList onNavigateToTask={id => this.navigateToGame(id)} />
      </div>
    );
  }
}

GamesConatainer.propTypes = {
  history: PropTypes.object.isRequired,
  userLogin: PropTypes.string
};

const mapStateToProps = state => ({
  userLogin: state.user.login
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(GamesConatainer);
