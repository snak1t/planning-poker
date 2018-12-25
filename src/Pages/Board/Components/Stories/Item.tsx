import React, { useContext } from 'react';
import { List, Icon } from 'antd';
import { PlayRoomContext } from '../../../../Data/PlaySession/PlayRoomContext';
import { calculateAverage } from '../../../../utils/average.score';
import { Story, StoryId } from './story.type';

type Props = {
    story: Story;
    onSetEditMode: (value: boolean) => void;
    deleteStory: (id: StoryId) => void;
    isAdmin: boolean;
};

export const Item: React.SFC<Props> = ({ story, onSetEditMode, deleteStory, isAdmin }) => {
    const { currentStory, actions } = useContext(PlayRoomContext);
    const isStoryActive = story.id === currentStory;

    const buttonRow = !isAdmin
        ? []
        : [
              isStoryActive ? null : <Icon type="star" onClick={() => actions.setStory(story.id)} />,
              isStoryActive ? null : <Icon type="delete" onClick={() => deleteStory(story.id)} />,
              <Icon type="edit" onClick={() => onSetEditMode(true)} />,
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
