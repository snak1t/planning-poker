import React from 'react';
import { Tabs, List } from 'antd';
import PropTypes from 'prop-types';
import partition from 'ramda/src/partition';
import length from 'ramda/src/length';
import styled from 'styled-components';

import StoryItem from './Item.container';
import './styles.css';
import { storyType } from '../../../../Data/Stories/type';
import { Wrapper } from './atoms';
import ReportContainer from '../Report/Container';

const separateStoriesByActivity = partition(story => story.score === 0);

const StyledList = styled(List)`
    height: 370px;
    overflow: scroll;
`;

const StoriesPane = ({ stories, admin }) =>
    length(stories) === 0 ? (
        <span>No stories</span>
    ) : (
        <StyledList
            itemLayout="vertical"
            dataSource={stories}
            renderItem={story => <StoryItem admin={admin} key={story.id} {...story} />}
        />
    );

export const StoryList = ({ stories, admin }) => {
    const [unplayedStories, playedStories] = separateStoriesByActivity(stories);

    return (
        <Wrapper title="Stories" extra={length(unplayedStories) === 0 ? <ReportContainer /> : null}>
            <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="Remaining" key="1">
                    <StoriesPane stories={unplayedStories} admin={admin} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Played" key="2">
                    <StoriesPane stories={playedStories} admin={admin} />
                </Tabs.TabPane>
            </Tabs>
        </Wrapper>
    );
};

StoryList.propTypes = {
    stories: PropTypes.arrayOf(storyType),
    admin: PropTypes.bool.isRequired,
};
