import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import merge from 'ramda/src/merge';
import { withRouter } from 'react-router-dom';

// Elements
import { Card } from '../Deck/Card';
import { TableButtons } from './ButtonBar';
import { CurrentStory } from '../Stories/CurrentStory';

// Actions
import { getCurrentStory } from '../../../../Data/Stories/reducer';
import { updateStory } from '../../../../Data/Stories/reducer';
import { Divider } from 'antd';
import {
    PlayRoomContext,
    setStoryToPlay,
    startPlaying,
    resetThePlay,
    revealCards,
} from '../../../../Data/PlaySession/PlayRoomContext';
import { calculateAverage } from '../../../../utils/average.score';

export function TableContainer(props) {
    const { dispatch, scores, isRevealing, isCompleted, currentStory } = useContext(PlayRoomContext);
    const story = getCurrentStory(currentStory, props.stories);
    const average = isCompleted && scores.length > 0 ? calculateAverage(scores) : 0;
    const resetCurrentStory = () => dispatch(setStoryToPlay(''));
    const startToPlay = () => dispatch(startPlaying());
    const resetGame = () => dispatch(resetThePlay());
    const showPlayedCards = () => dispatch(revealCards());

    const acceptScore = () => {
        const score = average;
        const updatedStory = merge(story, {
            active: true,
            score,
        });
        props.updateStory({
            login: props.match.params.user,
            gameID: props.match.params.gameID,
            story: updatedStory,
        });
        resetCurrentStory();
    };

    if (!story) return null;
    return (
        <section style={{ margin: '0 10px' }}>
            <CurrentStory {...story} onResetCurrent={resetCurrentStory}>
                {props.admin ? (
                    <TableButtons
                        completed={isCompleted}
                        reveal={isRevealing}
                        onStartToPlay={startToPlay}
                        onRevealCards={showPlayedCards}
                        onResetCurrent={resetGame}
                        onAcceptScore={acceptScore}
                    />
                ) : null}
                {isRevealing ? <Divider>Average Score is {average}</Divider> : null}
            </CurrentStory>

            {/*Players */}
            <div style={{ display: 'flex', height: '200px' }}>
                {scores.map((p, id) =>
                    p.score !== null ? <Card key={id} value={p.score} name={p.user} back={!isRevealing} /> : undefined,
                )}
            </div>
        </section>
    );
}

TableContainer.propTypes = {
    admin: PropTypes.bool.isRequired,
    updateStory: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
    stories: store.stories.all,
});

const mapDispatchToProps = {
    updateStory,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withRouter(TableContainer));
