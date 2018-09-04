import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import evolve from 'ramda/src/evolve';
import not from 'ramda/src/not';
import { Icon } from 'antd';

import './styles.css';
import GamesList from './Components/List';
import GameForm from './Components/Form';
import { GamesHeader } from './atoms';

export class GamesConatainer extends React.Component {
    state = {
        modal: false,
    };

    static propTypes = {
        history: PropTypes.object.isRequired,
        userLogin: PropTypes.string,
    };

    navigateToGame = id =>
        this.props.history.replace(`/game/${this.props.userLogin}/${id}`);

    toggleModalWindow = () => this.setState(evolve({ modal: not }));

    render() {
        return (
            <div className="Games-container">
                {this.state.modal ? (
                    <GameForm onClose={this.toggleModalWindow} />
                ) : null}
                <GamesHeader>
                    <h1>Your games</h1>
                    <Icon
                        type="folder-add"
                        style={{ fontSize: '1.4rem', cursor: 'pointer' }}
                        onClick={this.toggleModalWindow}
                    />
                </GamesHeader>
                <GamesList onNavigateToTask={this.navigateToGame} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    userLogin: state.user.login,
});

const mapDispatchToProps = {};

const enhancer = connect(
    mapStateToProps,
    mapDispatchToProps
);

export default enhancer(GamesConatainer);
