import {
  map,
  assoc,
  merge,
  lensProp,
  set,
  over,
  __,
  compose,
  ifElse,
  nthArg,
  equals,
  useWith,
  identity,
  prop
} from 'ramda'
import socketConstants from '../../server/controllers/socket.constants'

// Constants

const SYNC_PLAYERS = '[players] SYNC_PLAYER'

// Reducer Helper Functions

const playersAllLens = lensProp('all')
const readyToPlayLens = lensProp('readyToPlay')
const resetPlayersScore = compose(
  merge(__, { revealCards: false }),
  over(playersAllLens, map(assoc('score', null)))
)
const setSyncPlayers = set(playersAllLens)
const setReadyToPlay = ifElse(
  compose(equals(true), nthArg(0)),
  set(readyToPlayLens),
  compose(merge(__, { readyToPlay: false, revealCards: false }), nthArg(1))
)
const setPlayedCards = merge(__, { readyToPlay: false, revealCards: true })
const setCurrentStory = useWith(setReadyToPlay, [prop('isPlaying'), identity])

const defState = {
  all: [],
  readyToPlay: false,
  revealCards: false
}

// Reducer
export const players = (state = defState, { type, payload }) => {
  switch (type) {
    case SYNC_PLAYERS:
      return setSyncPlayers(payload, state)
    case socketConstants.BROADCAST_RESET_BIDS:
      return resetPlayersScore(state)
    case socketConstants.BROADCAST_READY_TO_PLAY:
      return setReadyToPlay(payload, state)
    case socketConstants.BROADCAST_SHOW_PLAYED_CARDS:
      return setPlayedCards(state)
    case socketConstants.SET_CURRENT_STORY:
      return setCurrentStory(payload, state)
    default:
      return state
  }
}

// Actions
export const syncPlayers = payload => ({
  type: SYNC_PLAYERS,
  payload
})

export const showPlayedCards = () => ({
  type: socketConstants.EMIT_SHOW_PLAYED_CARDS
})

export const emitResetBids = _ => ({
  type: socketConstants.EMIT_RESET_BIDS
})

export const emitReadyToPlay = payload => ({
  type: socketConstants.EMIT_READY_TO_PLAY,
  payload
})

export const leaveRoom = payload => ({
  type: socketConstants.LEAVE_ROOM,
  payload
})
