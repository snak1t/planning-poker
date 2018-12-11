import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { saveStory, getAllStories } from '../../../../Data/Stories/reducer';
import { StoryList } from './List';
import './styles.css';
import { storyType } from '../../../../Data/Stories/type';
import { compose } from 'recompose';
import { Wrapper, ScrollableContent, Panel } from './atoms';
import { StoriesForm } from './Form';

export function StoriesContainer({ saveStory, admin, stories, match: { params } }) {
    const [isAddingStoryMode, setMode] = useState(false);

    const addStory = titles =>
        saveStory({
            all: titles,
            gameID: params.gameID,
        });

    return (
        <Panel>
            <StoriesForm handleSubmit={addStory} toggleMode={setMode} isAdmin={admin} mode={isAddingStoryMode} />
            <ScrollableContent limit="100%">
                <Wrapper title="Game stories">
                    <StoryList stories={stories} admin={admin} />
                </Wrapper>
            </ScrollableContent>
        </Panel>
    );
}

StoriesContainer.propTypes = {
    stories: PropTypes.arrayOf(storyType),
    admin: PropTypes.bool.isRequired,
    saveStory: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
    stories: getAllStories(store),
});

const mapDispatchToProps = {
    saveStory,
};

const enhancer = compose(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    ),
    withRouter,
);

export default enhancer(StoriesContainer);
