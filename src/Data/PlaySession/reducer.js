import socketConstants from '../../socket.constants'
import { calculateAverage } from '../../utils/average.score'

// Constants

const SYNC_PLAYERS = '[players] SYNC_PLAYER'

const defaultState = {
  scores: [],
  isPlaying: false,
  isRevealing: false,
  currentStory: ''
}

const syncStateScores = (players, state) => {
  const scores = players.map(player => ({
    user: player.login,
    score: player.score
  }))
  return { ...state, scores }
}

const resetScores = scores => scores.map(p => ({ ...p, score: null }))

// Reducer
export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case SYNC_PLAYERS: {
      return syncStateScores(payload, state)
    }
    case socketConstants.BROADCAST_READY_TO_PLAY: {
      const updatedSlice = {
        isPlaying: payload,
        isRevealing: false
      }
      return { ...state, ...updatedSlice }
    }
    case socketConstants.BROADCAST_SHOW_PLAYED_CARDS: {
      const updatedSlice = {
        isPlaying: false,
        isRevealing: true
      }
      return { ...state, ...updatedSlice }
    }
    case socketConstants.BROADCAST_RESET_BIDS: {
      const updatedSlice = {
        isPlaying: true,
        isRevealing: false,
        scores: resetScores(state.scores)
      }
      return { ...state, ...updatedSlice }
    }
    case socketConstants.SET_CURRENT_STORY: {
      const updatedSlice = {
        isPlaying: false,
        isRevealing: false,
        currentStory: payload.story || '',
        scores: resetScores(state.scores)
      }
      return { ...state, ...updatedSlice }
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

export const emitReadyToPlay = payload => ({
  type: socketConstants.EMIT_READY_TO_PLAY,
  payload
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
