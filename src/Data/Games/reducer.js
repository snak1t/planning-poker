import merge from 'ramda/src/merge'
import reject from 'ramda/src/reject'
import find from 'ramda/src/find'
import when from 'ramda/src/when'
import length from 'ramda/src/length'
import identity from 'ramda/src/identity'
import map from 'ramda/src/map'
import propEq from 'ramda/src/propEq'
import propOr from 'ramda/src/propOr'
import prop from 'ramda/src/prop'
import useWith from 'ramda/src/useWith'
import append from 'ramda/src/append'
import nthArg from 'ramda/src/nthArg'
import ifElse from 'ramda/src/ifElse'
import compose from 'ramda/src/compose'
import equals from 'ramda/src/equals'
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
