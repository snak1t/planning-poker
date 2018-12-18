import React, { useState, useRef } from 'react';
import { useCurrentGame } from '../Games/GamesContext';
import Axios from 'axios';

import socketConstants from '../../socket.constants';
import { useSocket } from '../../utils/hooks/useSocket';
import { message } from 'antd';

export const StoriesContext = React.createContext();

export function StoriesProvider({ children, gameId }) {
    let _gameId = useRef();
    _gameId.current = gameId;
    const game = useCurrentGame(gameId);
    const [stories, setStories] = useState(game.stories);
    const emitSocket = useSocket(
        [
            socketConstants.BROADCAST_ADD_NEW_STORY,
            socketConstants.BROADCAST_UPDATE_STORY,
            socketConstants.BROADCAST_DELETED_STORY,
        ],
        data => {
            switch (data.type) {
                case socketConstants.BROADCAST_ADD_NEW_STORY: {
                    return setStories(prevStories => prevStories.concat(data.payload.stories));
                }
                case socketConstants.BROADCAST_UPDATE_STORY: {
                    return setStories(prevStories =>
                        prevStories.map(story => (story._id === data.payload._id ? data.payload : story)),
                    );
                }
                case socketConstants.BROADCAST_DELETED_STORY: {
                    return setStories(prevStories => prevStories.filter(story => story._id !== data.payload));
                }
                default:
                    break;
            }
        },
    );

    if (_gameId.current !== gameId) {
        setStories(game.stories);
    }

    const addStories = gameID => async storiesTitles => {
        const all = storiesTitles.map(story => ({ description: '', active: false, score: 0, ...story }));
        const { data: newStories } = await Axios.post('/api/game/story', { all, gameID });
        emitSocket({
            type: socketConstants.EMIT_ADD_NEW_STORY,
            payload: newStories,
        });
    };

    const updateStory = (login, gameID) => async story => {
        const { data } = await Axios.put('/api/game/story', { login, gameID, story });
        emitSocket({
            type: socketConstants.EMIT_UPDATE_STORY,
            payload: data.story,
        });
    };

    const removeStory = (login, gameID) => async storyID => {
        try {
            const { data } = await Axios.delete('/api/game/story', { params: { login, gameID, storyID } });
            if (!data.deleted) {
                throw new Error('Some issue while deleting a story');
            }
            emitSocket({
                type: socketConstants.EMIT_DELETED_STORY,
                payload: data.id,
            });
        } catch (error) {
            message.error(error.message);
        }
    };
    console.log(stories);
    return (
        <StoriesContext.Provider value={{ stories, addStories, updateStory, removeStory }}>
            {children}
        </StoriesContext.Provider>
    );
}
