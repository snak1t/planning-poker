import React, { useContext } from 'react';
import { Chat } from '../Chat';
import { PlayRoomContext } from '../../../../Data/PlaySession/PlayRoomContext';
import { Button, Tooltip } from 'antd';
import { StoriesContext } from '../../../../Data/Stories/StoriesContext';
import { calculateAverage } from '../../../../utils/average.score';
import { FloatButtonsContainer } from '../../../../components/FloatButtonsContainer/FloatButtonsContainer';

export const ActionButtons = () => {
    const { currentStory, isRevealing, isCompleted, players, actions } = useContext(PlayRoomContext);
    const { actions: storiesActions, stories } = useContext(StoriesContext);

    const activeStory = stories.find(story => story.id === currentStory);
    const isStoryActive = currentStory !== '' && currentStory !== null;
    const resetCurrentStory = () => actions.setStory(null);
    const setScore = () => {
        if (activeStory) {
            storiesActions.updateStory({
                ...activeStory,
                score: calculateAverage(players),
            });
            resetCurrentStory();
        }
    };
    return (
        <FloatButtonsContainer>
            {isStoryActive && !isCompleted ? (
                <Tooltip title="Start the game round" placement="left">
                    <Button
                        onClick={actions.startPlayRound}
                        type="primary"
                        shape="circle"
                        icon="play-circle"
                        size="large"
                    />
                </Tooltip>
            ) : null}
            {isCompleted && !isRevealing ? (
                <Tooltip title="Reveal user scores" placement="left">
                    <Button
                        onClick={actions.showPlayedCards}
                        type="primary"
                        shape="circle"
                        icon="question-circle"
                        size="large"
                    />
                </Tooltip>
            ) : null}
            {isRevealing ? (
                <Tooltip title="Set the final score" placement="left">
                    <Button onClick={setScore} type="primary" shape="circle" icon="check-circle" size="large" />
                </Tooltip>
            ) : null}
            {isRevealing ? (
                <Tooltip title="Play another round for the story" placement="left">
                    <Button onClick={actions.startPlayRound} type="primary" shape="circle" icon="reload" size="large" />
                </Tooltip>
            ) : null}
            {isStoryActive ? (
                <Tooltip title="Reset the progress and pick another story" placement="left">
                    <Button onClick={resetCurrentStory} type="danger" shape="circle" icon="close-circle" size="large" />
                </Tooltip>
            ) : null}
            <Chat />
        </FloatButtonsContainer>
    );
};
