import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';

import { Item } from './Item';
import { ItemEdit } from './Item.form';
import { StoriesContext } from '../../../../Data/Stories/StoriesContext';

function StoryItem(props) {
    const [editMode, setEditMode] = useState(false);
    const { actions } = useContext(StoriesContext);
    const onUpdateStory = partialStory => {
        actions.updateStory({ ...props.story, ...partialStory });
    };
    const allProps = { ...props, onUpdateStory, deleteStory: actions.removeStory, setEditMode, editMode };
    return editMode ? <ItemEdit {...allProps} /> : <Item {...allProps} />;
}

export default withRouter(StoryItem);
