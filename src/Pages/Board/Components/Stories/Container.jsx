import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';

import { StoryList } from './List';
import './styles.css';
import { Panel } from './atoms';
import { StoriesForm } from './Form';
import { StoriesContext } from '../../../../Data/Stories/StoriesContext';

export const StoriesContainer = withRouter(function StoriesContainer({ admin, match: { params } }) {
    const [isAddingStoryMode, setMode] = useState(false);
    const { stories, actions } = useContext(StoriesContext);

    return (
        <Panel>
            <StoryList stories={stories} admin={admin} />
            <StoriesForm
                handleSubmit={actions.addStories}
                toggleMode={setMode}
                isAdmin={admin}
                mode={isAddingStoryMode}
            />
        </Panel>
    );
});
