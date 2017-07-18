import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { isNil, evolve, always, not } from 'ramda';

import { StoriesForm } from './form';
import { saveStory } from './reducer';
import { StoryList } from './list';
import styles from './styles.css';
import { storyType } from './type.js';

export class StoriesContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      addMode: false
    };
  }

  toggleAddMode(currentMode) {
    this.setState(evolve({ addMode: always(!currentMode) }));
  }

  addStory(titles) {
    this.props.saveStory({
      all: titles,
      gameID: this.props.match.params.gameID
    });
  }

  render() {
    return (
      <section className={styles.container}>
        <header className={styles.header}>
          <h3 className={styles.title}>Stories</h3>
        </header>
        <StoryList stories={this.props.stories} admin={this.props.admin} />
        <StoriesForm
          handleSubmit={title => this.addStory(title)}
          toggleMode={mode => this.toggleAddMode(mode)}
          isAdmin={this.props.admin}
          mode={this.state.addMode}
        />
      </section>
    );
  }
}

StoriesContainer.propTypes = {
  stories: PropTypes.arrayOf(storyType),
  admin: PropTypes.bool.isRequired,
  saveStory: PropTypes.func.isRequired
};

const mapStateToProps = store => ({
  stories: store.stories.all
});

const mapDispatchToProps = {
  saveStory
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(StoriesContainer)
);
