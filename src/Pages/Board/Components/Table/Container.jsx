import React, { useContext } from 'react';
import { Divider } from 'antd';
import PropTypes from 'prop-types';
import merge from 'ramda/src/merge';
import { withRouter } from 'react-router-dom';

// Elements
import { Card } from '../Deck/Card';
import { TableButtons } from './ButtonBar';
import { CurrentStory } from '../Stories/CurrentStory';

// Actions
import {
    PlayRoomContext,
    setStoryToPlay,
    startPlaying,
    resetThePlay,
    revealCards,
} from '../../../../Data/PlaySession/PlayRoomContext';
import { calculateAverage } from '../../../../utils/average.score';
import { StoriesContext } from '../../../../Data/Stories/StoriesContext';

export function TableContainer({ admin, match: { params } }) {
    const { dispatch, scores, isRevealing, isCompleted, currentStory } = useContext(PlayRoomContext);
    const { stories, updateStory } = useContext(StoriesContext);
    const story = currentStory === '' ? null : stories.find(story => story.id === currentStory);
    const average = isCompleted && scores.length > 0 ? calculateAverage(scores) : 0;
    const resetCurrentStory = () => dispatch(setStoryToPlay(''));
    const startToPlay = () => dispatch(startPlaying());
    const resetGame = () => dispatch(resetThePlay());
    const showPlayedCards = () => dispatch(revealCards());

    const acceptScore = () => {
        updateStory(
            merge(story, {
                active: true,
                score: average,
            }),
        );
        resetCurrentStory();
    };

    if (!story) return null;
    return (
        <section style={{ margin: '0 10px' }}>
            <CurrentStory {...story} onResetCurrent={resetCurrentStory}>
                {admin ? (
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
};

export default withRouter(TableContainer);
