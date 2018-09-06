import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import evolve from 'ramda/src/evolve';
import always from 'ramda/src/always';

import { saveStory, getAllStories } from '../../../../Data/Stories/reducer';
import { StoryList } from './List';
import './styles.css';
import { storyType } from '../../../../Data/Stories/type';
import { compose } from 'recompose';
import { Wrapper, ScollableContent, Panel } from './atoms';
import { StoriesForm } from './Form';

export class StoriesContainer extends React.Component {
    state = {
        addMode: false,
    };

    static propTypes = {
        stories: PropTypes.arrayOf(storyType),
        admin: PropTypes.bool.isRequired,
        saveStory: PropTypes.func.isRequired,
    };

    toggleAddMode = currentMode => this.setState(evolve({ addMode: always(!currentMode) }));

    addStory = titles =>
        this.props.saveStory({
            all: titles,
            gameID: this.props.match.params.gameID,
        });

    render() {
        return (
            <Panel>
                <StoriesForm
                    handleSubmit={this.addStory}
                    toggleMode={this.toggleAddMode}
                    isAdmin={this.props.admin}
                    mode={this.state.addMode}
                />
                <ScollableContent limit="100%">
                    <Wrapper title="Game stories">
                        <StoryList stories={this.props.stories} admin={this.props.admin} />
                    </Wrapper>
                </ScollableContent>
            </Panel>
        );
    }
}

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
