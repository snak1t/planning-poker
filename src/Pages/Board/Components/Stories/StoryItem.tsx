import React, { useState, useContext } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Item } from './Item';
import { ItemEdit } from './Item.form';
import { StoriesContext } from '../../../../Data/Stories/StoriesContext';
import { Story } from './story.type';

type OwnProps = {
    isAdmin: boolean;
    story: Story;
};

type Props = RouteComponentProps & OwnProps;

const StoryItem: React.SFC<Props> = props => {
    const [editMode, setEditMode] = useState(false);
    const { actions } = useContext(StoriesContext);
    const onUpdateStory = (partialStory: Partial<Story>) => {
        actions.updateStory({ ...props.story, ...partialStory });
    };

    return editMode ? (
        <ItemEdit {...props} onUpdateStory={onUpdateStory} onSetEditMode={setEditMode} />
    ) : (
        <Item
            story={props.story}
            onSetEditMode={setEditMode}
            isAdmin={props.isAdmin}
            deleteStory={actions.removeStory}
        />
    );
};

export default withRouter(StoryItem);
