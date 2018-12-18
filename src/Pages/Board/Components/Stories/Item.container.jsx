import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Item } from './Item';
import { ItemEdit } from './Item.form';
import { updateStory, removeStory } from '../../../../Data/Stories/reducer';

const mapDispatchToProps = {
    updateStory,
    deleteStory: removeStory,
};

function StoryItem(props) {
    const [editMode, setEditMode] = useState(false);
    const updateStory = story =>
        props.updateStory({
            login: props.match.params.user,
            gameID: props.match.params.gameID,
            story,
        });
    const deleteStory = id =>
        deleteStory({
            login: props.match.params.user,
            gameID: props.match.params.gameID,
            storyID: id,
        });
    const allProps = { ...props, updateStory, deleteStory, setEditMode, editMode };
    return editMode ? <ItemEdit {...allProps} /> : <Item {...allProps} />;
}

export default withRouter(
    connect(
        null,
        mapDispatchToProps,
    )(StoryItem),
);
