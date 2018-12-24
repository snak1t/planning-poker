import * as React from 'react';

import { message } from 'antd';
import { useAsyncEffect } from '../../utils/hooks/useAsyncEffect';
import { ApiClient } from '../../utils/api-client';
import { useSocket } from '../../utils/hooks/useSocket';

type Story = {
    id: string;
    description: string;
    score: number | string;
    title: string;
};

type ContextState = {
    stories: Story[];
    actions: {
        addStories: (title: Array<{ title: string }>) => Promise<void>;
        updateStory: (story: Story) => Promise<void>;
        removeStory: (storyId: string) => Promise<void>;
    };
};
export const StoriesContext = React.createContext<ContextState>({
    stories: [],
    actions: {
        addStories: () => Promise.resolve(),
        updateStory: () => Promise.resolve(),
        removeStory: () => Promise.resolve(),
    },
});

type Props = {
    gameId: string;
};

type SocketListeners = {
    'add-story': (data: { stories: Story[] }) => void;
    'update-story': (data: { story: Story }) => void;
    'remove-story': (data: { id: string }) => void;
};

export const StoriesProvider: React.SFC<Props> = ({ children, gameId }) => {
    const [stories, setStories] = React.useState<Story[]>([]);
    useAsyncEffect(
        async () => {
            const { data } = await ApiClient.get(`/api/game/${gameId}`);
            setStories(data.stories || []);
        },
        [gameId],
    );

    const setUpdatedStoryToStore = (updatedStory: Story): void => {
        setStories(prevStories =>
            prevStories.map(story => {
                if (story.id === updatedStory.id) {
                    return { ...story, ...updatedStory };
                }
                return story;
            }),
        );
    };

    const removeStoryFromState = (id: string) => {
        setStories(prevStories => prevStories.filter(story => story.id !== id));
    };

    const emitSocket = useSocket<SocketListeners>({
        'add-story': ({ stories: newStories }) => {
            setStories(prevState => prevState.concat(newStories));
        },
        'update-story': ({ story }) => {
            setUpdatedStoryToStore(story);
        },
        'remove-story': ({ id }) => {
            removeStoryFromState(id);
        },
    });

    const addStories = async (storiesTitles: Array<{ title: string }>) => {
        const stories: Partial<Story>[] = storiesTitles.map(story => ({
            description: '',
            active: false,
            score: 0,
            ...story,
        }));
        const { data }: { data: Story[] } = await ApiClient.post('/api/story', { stories, gameId });
        setStories(prevStories => prevStories.concat(data));
        emitSocket('emit-add-story', { stories: data });
    };

    const updateStory = async (story: Story) => {
        const { data }: { data: Story } = await ApiClient.put('/api/story', story);
        setUpdatedStoryToStore(data);
        emitSocket('emit-update-story', { story: data });
    };

    const removeStory = async (storyId: string) => {
        try {
            const { data } = await ApiClient.delete('/api/story', { params: { storyId } });
            removeStoryFromState(data.id);
            emitSocket('emit-remove-story', data);
        } catch (error) {
            message.error(error.message);
        }
    };
    return (
        <StoriesContext.Provider value={{ stories, actions: { addStories, updateStory, removeStory } }}>
            {children}
        </StoriesContext.Provider>
    );
};
