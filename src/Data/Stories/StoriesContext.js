import React, { useState } from 'react';

import socketConstants from '../../socket.constants';
import { useSocket } from '../../utils/hooks/useSocket';
import { message } from 'antd';
import { useAsyncEffect } from '../../utils/hooks/useAsyncEffect';
import { ApiClient } from '../../utils/api-client';

export const StoriesContext = React.createContext();

export function StoriesProvider({ children, gameId }) {
    const [stories, setStories] = useState([]);
    useAsyncEffect(
        async () => {
            const { data } = await ApiClient.get(`/api/game/${gameId}`);
            setStories(data.stories || []);
        },
        [gameId],
    );
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
                        prevStories.map(story => {
                            if (story.id === data.payload.id) {
                                return { ...story, ...data.payload };
                            }
                            return story;
                        }),
                    );
                }
                case socketConstants.BROADCAST_DELETED_STORY: {
                    return setStories(prevStories => prevStories.filter(story => story.id !== data.payload));
                }
                default:
                    break;
            }
        },
    );

    const addStories = gameId => async storiesTitles => {
        const stories = storiesTitles.map(story => ({ description: '', active: false, score: 0, ...story }));
        const { data } = await ApiClient.post('/api/story', { stories, gameId });
        emitSocket({
            type: socketConstants.EMIT_ADD_NEW_STORY,
            payload: {
                stories: data,
            },
        });
    };

    const updateStory = async story => {
        const { data } = await ApiClient.put('/api/story', story);
        emitSocket({
            type: socketConstants.EMIT_UPDATE_STORY,
            payload: data,
        });
    };

    const removeStory = async storyId => {
        try {
            const { data } = await ApiClient.delete('/api/story', { params: { storyId } });
            emitSocket({
                type: socketConstants.EMIT_DELETED_STORY,
                payload: data.id,
            });
        } catch (error) {
            message.error(error.message);
        }
    };
    return (
        <StoriesContext.Provider value={{ stories, addStories, updateStory, removeStory }}>
            {children}
        </StoriesContext.Provider>
    );
}
