import {
  merge,
  lensProp,
  over,
  tap,
  set,
  append,
  identity,
  prop,
  compose,
  ifElse,
  propEq,
  useWith,
  flatten,
  concat,
  map
} from 'ramda';
import socketConstants from '../../server/controllers/socket.constants';
import { putFetch, deleteFetch, postFetch } from '../utils/fetch';

// Helper functions

const storiesLens = lensProp('all');
const currentStoryLens = lensProp('current');
const setCurrentStory = useWith(set(currentStoryLens), [
  prop('story'),
  identity
]);
const addStory = useWith(over(storiesLens), [concat, identity]);
const updateStories = useWith(set(storiesLens), [prop('stories'), identity]);

// Defaul State
const defaultState = {
  all: [],
  current: null
};

//Reducer
export const stories = (state = defaultState, { type, payload }) => {
  switch (type) {
    case socketConstants.BROADCAST_ADD_NEW_STORY:
      return addStory(payload, state);
    case '[game] UPDATE_GAME':
      return updateStories(payload, state);
    case socketConstants.BROADCAST_UPDATE_STORY:
      return merge(state, {
        all: state.all.map(story => story._id === payload._id ? payload : story)
      });
    case socketConstants.BROADCAST_DELETED_STORY:
      return merge(state, {
        all: state.all.filter(story => story._id !== payload)
      });
    case socketConstants.SET_CURRENT_STORY:
      return setCurrentStory(payload, state);
    default:
      return state;
  }
};

// Actions
export const emitAddStories = stories => ({
  type: socketConstants.EMIT_ADD_NEW_STORY,
  payload: stories
});

const addMissingFields = over(
  storiesLens,
  map(merge({ description: '', active: false, score: 0 }))
);

export const saveStory = compose(
  postFetch('/api/game/story', compose(emitAddStories, prop('stories'))),
  addMissingFields
);

/**
 * 
 * @param {Object story} payload 
 */
export const setUpdatatedStory = payload => ({
  type: socketConstants.EMIT_UPDATE_STORY,
  payload
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
  compose(setUpdatatedStory, prop('story'))
);

/**
 * 
 * @param {String id} payload 
 */
export const emitDeletedStory = payload => ({
  type: socketConstants.EMIT_DELETED_STORY,
  payload
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
  ifElse(propEq('deleted', true), compose(emitDeletedStory, prop('id')), () => {
    throw new Error('Item wasnt deleted');
  })
);

export const emitCurrentStory = payload => ({
  type: socketConstants.EMIT_CURRENT_STORY,
  payload
});

export const selectNextStory = _ => {
  return emitCurrentStory(null);
};

//Selectors

export const getCurrentStory = ({ all, current }) =>
  all.find(item => item._id === current);
