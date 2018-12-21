import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';

import { Item } from './Item';
import { ItemEdit } from './Item.form';
import { StoriesContext } from '../../../../Data/Stories/StoriesContext';

function StoryItem(props) {
    const [editMode, setEditMode] = useState(false);
    const { updateStory, removeStory } = useContext(StoriesContext);
    const onUpdateStory = partialStory => {
        updateStory({ ...props.story, ...partialStory });
    };
    const allProps = { ...props, onUpdateStory, deleteStory: removeStory, setEditMode, editMode };
    return editMode ? <ItemEdit {...allProps} /> : <Item {...allProps} />;
}

export default withRouter(StoryItem);
