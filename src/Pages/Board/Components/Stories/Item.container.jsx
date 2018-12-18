import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';

import { Item } from './Item';
import { ItemEdit } from './Item.form';
import { StoriesContext } from '../../../../Data/Stories/StoriesContext';

function StoryItem(props) {
    const [editMode, setEditMode] = useState(false);
    const { updateStory, removeStory } = useContext(StoriesContext);
    const pUpdateStory = updateStory(props.match.params.user, props.match.params.gameID);
    const deleteStory = removeStory(props.match.params.user, props.match.params.gameID);
    const allProps = { ...props, updateStory: pUpdateStory, deleteStory, setEditMode, editMode };
    return editMode ? <ItemEdit {...allProps} /> : <Item {...allProps} />;
}

export default withRouter(StoryItem);
