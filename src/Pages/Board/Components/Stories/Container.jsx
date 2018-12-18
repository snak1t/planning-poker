import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { StoryList } from './List';
import './styles.css';
import { storyType } from '../../../../Data/Stories/type';
import { Panel } from './atoms';
import { StoriesForm } from './Form';
import { StoriesContext } from '../../../../Data/Stories/StoriesContext';

export function StoriesContainer({ admin, match: { params } }) {
    const [isAddingStoryMode, setMode] = useState(false);
    const { stories, addStories } = useContext(StoriesContext);
    const addStory = addStories(params.gameID);

    return (
        <Panel>
            <StoryList stories={stories} admin={admin} />
            <StoriesForm handleSubmit={addStory} toggleMode={setMode} isAdmin={admin} mode={isAddingStoryMode} />
        </Panel>
    );
}

StoriesContainer.propTypes = {
    stories: PropTypes.arrayOf(storyType),
    admin: PropTypes.bool.isRequired,
};

export default withRouter(StoriesContainer);
