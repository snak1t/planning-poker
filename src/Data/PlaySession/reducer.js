import socketConstants from '../../socket.constants'
import { calculateAverage } from '../../utils/average.score'

// Constants

const SYNC_PLAYERS = '[players] SYNC_PLAYER'
const SYNC_GAME_SESSION = '[sockets] SYNC_GAME_SESSION'

const defaultState = {
  scores: [],
  isPlaying: false,
  isRevealing: false,
  currentStory: ''
}

// Reducer
export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case SYNC_GAME_SESSION: {
      return payload
    }
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

export const emitReadyToPlay = () => ({
  type: socketConstants.EMIT_READY_TO_PLAY
})

export const leaveRoom = payload => ({
  type: socketConstants.LEAVE_ROOM,
  payload
})

// Selectors

export const isGameCompleted = ({ playSession: { scores } }) =>
  scores.every(p => p.score !== null)

export const calculateScore = store =>
  store.playSession.scores.length !== 0 && isGameCompleted(store)
    ? calculateAverage(store.playSession.scores)
    : 0

export const getScores = ({ playSession }) => playSession.scores
