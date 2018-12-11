import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import merge from 'ramda/src/merge';
import { withRouter } from 'react-router-dom';

import { isGameCompleted, calculateScore, getScores } from '../../../../Data/PlaySession/reducer';

import { storyType } from '../../../../Data/Stories/type';

// Elements
import { Card } from '../Deck/Card';
import { TableButtons } from './ButtonBar';
import { CurrentStory } from '../Stories/CurrentStory';

// Actions
import { getCurrentStory } from '../../../../Data/Stories/reducer';
import { updateStory, emitCurrentStory } from '../../../../Data/Stories/reducer';
import { emitResetBids, emitReadyToPlay, showPlayedCards } from '../../../../Data/PlaySession/reducer';
import { Divider } from 'antd';

export function TableContainer(props) {
    const resetCurrentStory = () => props.setCurrentStory('');

    const acceptScore = () => {
        const score = props.averageScore;
        const story = merge(props.story, {
            active: true,
            score,
        });
        props.updateStory({
            login: props.match.params.user,
            gameID: props.match.params.gameID,
            story,
        });
        resetCurrentStory();
    };

    if (!props.story) return null;
    return (
        <section style={{ margin: '0 10px' }}>
            <CurrentStory {...props.story} onResetCurrent={resetCurrentStory}>
                {props.admin ? (
                    <TableButtons
                        completed={props.completed}
                        reveal={props.revealCards}
                        onStartToPlay={props.startToPlay}
                        onRevealCards={props.showPlayedCards}
                        onResetCurrent={props.resetBids}
                        onAcceptScore={acceptScore}
                    />
                ) : null}
                {props.revealCards ? <Divider>Average Score is {props.averageScore}</Divider> : null}
            </CurrentStory>

            {/*Players */}
            <div style={{ display: 'flex', height: '200px' }}>
                {props.players.map((p, id) =>
                    p.score !== null ? (
                        <Card key={id} value={p.score} name={p.user} back={!props.revealCards} />
                    ) : (
                        undefined
                    ),
                )}
            </div>
        </section>
    );
}

TableContainer.propTypes = {
    players: PropTypes.arrayOf(
        PropTypes.shape({
            user: PropTypes.string.isRequired,
            score: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        }),
    ),
    story: storyType,
    admin: PropTypes.bool.isRequired,
    revealCards: PropTypes.bool.isRequired,
    updateStory: PropTypes.func.isRequired,
    setCurrentStory: PropTypes.func.isRequired,
    resetBids: PropTypes.func.isRequired,
    startToPlay: PropTypes.func.isRequired,
    showPlayedCards: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
    players: getScores(store),
    story: getCurrentStory(store),
    revealCards: store.playSession.isRevealing,
    completed: isGameCompleted(store),
    averageScore: calculateScore(store),
});

const mapDispatchToProps = {
    updateStory,
    setCurrentStory: emitCurrentStory,
    resetBids: emitResetBids,
    startToPlay: emitReadyToPlay,
    showPlayedCards,
};

const enhancer = compose(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    ),
    withRouter,
);

export default enhancer(TableContainer);
