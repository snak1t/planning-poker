import React, { useContext } from 'react';
import { List, Icon } from 'antd';
import { PlayRoomContext } from '../../../../Data/PlaySession/PlayRoomContext';
import { calculateAverage } from '../../../../utils/average.score';

export const Item = ({ story, setEditMode, deleteStory, onUpdateStory, admin }) => {
    const { currentStory, isRevealing, isCompleted, players, actions } = useContext(PlayRoomContext);
    const setCurrentStory = id => actions.setStory(id);
    const isStoryActive = story.id === currentStory;
    const resetCurrentStory = () => actions.setStory(null);
    const setScore = () => {
        onUpdateStory({
            score: calculateAverage(players),
        });
        resetCurrentStory();
    };

    const buttonRow = !admin
        ? []
        : [
              isStoryActive ? null : <Icon type="star" onClick={() => setCurrentStory(story.id)} />,
              isStoryActive ? null : <Icon type="delete" onClick={() => deleteStory(story.id)} />,
              isStoryActive && !isCompleted ? <Icon type="play-circle" onClick={actions.startPlayRound} /> : null,
              isCompleted && !isRevealing ? <Icon type="question-circle" onClick={actions.showPlayedCards} /> : null,
              isRevealing ? <Icon type="check-circle" onClick={setScore} /> : null,
              isRevealing ? <Icon type="reload" onClick={actions.startPlayRound} /> : null,
              <Icon type="edit" onClick={setEditMode} />,
              isStoryActive ? <Icon type="close-circle" onClick={resetCurrentStory} /> : null,
          ].filter(Boolean);

    return (
        <List.Item
            actions={buttonRow}
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
