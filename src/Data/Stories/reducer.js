// Ramda imports
import merge from 'ramda/src/merge';
import omit from 'ramda/src/omit';
import lensProp from 'ramda/src/lensProp';
import over from 'ramda/src/over';
import prop from 'ramda/src/prop';
import compose from 'ramda/src/compose';
import ifElse from 'ramda/src/ifElse';
import propEq from 'ramda/src/propEq';
import map from 'ramda/src/map';

import socketConstants from '../../socket.constants';
import { putFetch, deleteFetch, postFetch } from '../../utils/fetch';
import { UPDATE_GAME } from '../Games/reducer';

// Helper functions

const storiesLens = lensProp('all');

const mergeStory = (acc, story) => {
    const id = story._id;
    const ids = [...acc.ids, id];
    const all = { ...acc.all, [id]: story };
    return { ...acc, all, ids };
};

const addStoriesToState = (stories, state) => {
    return stories.reduce(mergeStory, state);
};

const updateStoryInState = (story, state) => {
    const all = { ...state.all, [story._id]: story };
    return { ...state, all };
};

const deleteStoryFromState = (targetID, state) => {
    const all = omit([targetID], state.all);
    const ids = state.ids.filter(id => targetID !== id);
    return { ...state, ids, all };
};

// Default State
const defaultState = {
    all: {},
    ids: [],
};

//Reducer
export const stories = (state = defaultState, { type, payload }) => {
    switch (type) {
        case socketConstants.BROADCAST_ADD_NEW_STORY:
            return addStoriesToState(payload, state);
        case UPDATE_GAME: {
            return addStoriesToState(payload.stories, defaultState);
        }
        case socketConstants.BROADCAST_UPDATE_STORY:
            return updateStoryInState(payload, state);
        case socketConstants.BROADCAST_DELETED_STORY:
            return deleteStoryFromState(payload, state);
        default:
            return state;
    }
};

// Actions
export const emitAddStories = stories => ({
    type: socketConstants.EMIT_ADD_NEW_STORY,
    payload: stories,
});

const addMissingFields = over(storiesLens, map(merge({ description: '', active: false, score: 0 })));

export const saveStory = compose(
    postFetch(
        '/api/game/story',
        compose(
            emitAddStories,
            prop('stories'),
        ),
    ),
    addMissingFields,
);

/**
 *
 * @param {Object story} payload
 */
export const setUpdatatedStory = payload => ({
    type: socketConstants.EMIT_UPDATE_STORY,
    payload,
});

/**
 * data => {
 *  login: String,
 *  gameID: String,
 *  story: Object{title: String, description: String}
 * }
 */
export const updateStory = putFetch(
    '/api/game/story',
    compose(
        setUpdatatedStory,
        prop('story'),
    ),
);

/**
 *
 * @param {String id} payload
 */
export const emitDeletedStory = payload => ({
    type: socketConstants.EMIT_DELETED_STORY,
    payload,
});

/**
 * @param data => {
 *  login: String,
 *  gameID: String,
 *  storyID: String
 * }
 */
export const removeStory = deleteFetch(
    '/api/game/story',
    ifElse(
        propEq('deleted', true),
        compose(
            emitDeletedStory,
            prop('id'),
        ),
        () => {
            throw new Error('Item wasnt deleted');
        },
    ),
);

export const emitCurrentStory = payload => ({
    type: socketConstants.EMIT_CURRENT_STORY,
    payload,
});

//Selectors

export const getCurrentStory = ({ playSession: { currentStory }, stories: { all } }) =>
    currentStory === '' ? null : all[currentStory];

export const getAllStories = ({ stories: { all, ids } }) => ids.map(id => all[id]);
