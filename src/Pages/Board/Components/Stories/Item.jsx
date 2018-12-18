import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { List, Icon } from 'antd';
import { PlayRoomContext, setStoryToPlay } from '../../../../Data/PlaySession/PlayRoomContext';

export const Item = ({ _id, title, score, description, setEditMode, deleteStory, admin }) => {
    const { currentStory, dispatch } = useContext(PlayRoomContext);
    const setCurrentStory = id => dispatch(setStoryToPlay(id));
    const actionsForOtherStories = [
        <Icon type="play-circle" onClick={() => setCurrentStory(_id)} />,
        <Icon type="delete" onClick={() => deleteStory(_id)} />,
    ];
    const actions = !admin
        ? []
        : [<Icon type="edit" onClick={setEditMode} />, ...(currentStory === _id ? [] : actionsForOtherStories)];
    return (
        <List.Item actions={actions}>
            <List.Item.Meta title={`${title} ${score !== 0 ? ` - ${score} sp` : ''}`} description={description} />
        </List.Item>
    );
};

Item.propTypes = {
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    score: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    description: PropTypes.string,
    setEditMode: PropTypes.func.isRequired,
    deleteStory: PropTypes.func.isRequired,
    admin: PropTypes.bool,
};
