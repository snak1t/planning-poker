import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { List, Icon } from 'antd';
import {
    PlayRoomContext,
    setStoryToPlay,
    startPlaying,
    revealCards,
    resetThePlay,
} from '../../../../Data/PlaySession/PlayRoomContext';
import { calculateAverage } from '../../../../utils/average.score';
import { storyType } from '../../../../Data/Stories/type';

export const Item = ({ story, setEditMode, deleteStory, onUpdateStory, admin }) => {
    const { currentStory, isRevealing, isCompleted, dispatch, scores } = useContext(PlayRoomContext);
    const setCurrentStory = id => dispatch(setStoryToPlay(id));
    const isStoryActive = story.id === currentStory;
    const startToPlay = () => dispatch(startPlaying());
    const showPlayedCards = () => dispatch(revealCards());
    const resetCurrentStory = () => dispatch(setStoryToPlay(''));
    const resetGame = () => dispatch(resetThePlay());
    const setScore = () => {
        onUpdateStory({
            score: calculateAverage(scores),
        });
        resetCurrentStory();
    };

    const actions = !admin
        ? []
        : [
              isStoryActive ? null : <Icon type="star" onClick={() => setCurrentStory(story.id)} />,
              isStoryActive ? null : <Icon type="delete" onClick={() => deleteStory(story.id)} />,
              isStoryActive && !isCompleted ? <Icon type="play-circle" onClick={startToPlay} /> : null,
              isCompleted && !isRevealing ? <Icon type="question-circle" onClick={showPlayedCards} /> : null,
              isRevealing ? <Icon type="check-circle" onClick={setScore} /> : null,
              isRevealing ? <Icon type="reload" onClick={resetGame} /> : null,
              <Icon type="edit" onClick={setEditMode} />,
              isStoryActive ? <Icon type="close-circle" onClick={resetCurrentStory} /> : null,
          ].filter(Boolean);

    return (
        <List.Item
            actions={actions}
            style={{
                backgroundColor: isStoryActive ? '#e6f7fe' : '#fff',
                padding: '.4rem',
            }}
        >
            <List.Item.Meta
                title={`${story.title} ${story.score !== 0 ? ` - ${story.score} sp` : ''}`}
                description={story.description}
            />
        </List.Item>
    );
};

Item.propTypes = {
    story: storyType,
    setEditMode: PropTypes.func.isRequired,
    deleteStory: PropTypes.func.isRequired,
    admin: PropTypes.bool,
};
