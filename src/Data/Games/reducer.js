import {
  nthArg,
  ifElse,
  compose,
  equals,
  append,
  useWith,
  prop,
  propOr,
  propEq,
  map,
  identity,
  length,
  when,
  find,
  reject,
  merge
} from 'ramda'
import { postFetch, deleteFetch } from '../../utils/fetch'

// Helper functions
const switchIfEquals = when(useWith(equals, [prop('_id'), prop('_id')]), merge)

const setUpdatedGame = ifElse(
  compose(equals(0), length, nthArg(1)),
  append(),
  useWith(map, [switchIfEquals, identity])
)

const extractGamesFromObj = propOr([], 'games')
const removeFromStore = useWith(reject, [
  id => compose(equals(id), prop('_id')),
  identity
])

// constants
export const USER_LOGIN = '[user] LOGIN_USER'
export const ADD_GAME = '[game] ADD_GAME'
export const UPDATE_GAME = '[game] UPDATE_GAME'
export const DELETE_GAME = '[game] DELETE_GAME'

// Reducer
export default (state = [], { type, payload }) => {
  switch (type) {
    case USER_LOGIN:
      return extractGamesFromObj(payload)
    case ADD_GAME:
      return append(payload, state)
    case UPDATE_GAME:
      return setUpdatedGame(payload, state)
    case DELETE_GAME:
      return removeFromStore(payload, state)
    default:
      return state
  }
}

// Sync actions

const addGame = game => ({
  type: ADD_GAME,
  payload: game
})

const updateGame = game => ({
  type: UPDATE_GAME,
  payload: game
})

export const setDeletedGame = payload => ({
  type: DELETE_GAME,
  payload
})

// Async actions
export const fetchGame = postFetch(
  '/api/game/find',
  compose(updateGame, prop('game'))
)
export const saveGame = postFetch('/api/game', compose(addGame, prop('game')))

export const deleteGame = deleteFetch(
  '/api/game',
  compose(setDeletedGame, prop('id'))
)

// Getters
export const findGameById = (id, a) => find(propEq('_id', id), a)
