const { curry } = require('ramda')
const { createStore } = require('./mini-redux')
const socketsType = require('./socket.constants')

const baseEmitMessage = curry((io, room, type, message) =>
  io.sockets.in(room).emit(type, message)
)

const SYNC_GAME_SESSION = '[sockets] SYNC_GAME_SESSION'

module.exports = io => {
  const rooms = createStore()
  const emitMessage = baseEmitMessage(io)

  const broadcastSyncGameSession = id =>
    emitMessage(id, 'action', {
      type: SYNC_GAME_SESSION,
      payload: rooms.get(id)
    })

  io.sockets.on('connection', socket => {
    let roomID = ''
    let user = null //TODO: save in session maybe?

    socket.on('action', ({ type, payload }) => {
      switch (type) {
        case socketsType.ENTER_ROOM:
          return addToRoom(payload)
        case socketsType.LEAVE_ROOM:
          return leaveRoom()
        case socketsType.SEND_SCORE:
          return setScore(payload)
        case socketsType.EMIT_CURRENT_STORY:
          return sendCurrentStory(payload)
        case socketsType.EMIT_RESET_BIDS:
          return sendResetBids(payload)
        case socketsType.EMIT_READY_TO_PLAY:
          return sendReadyToPlay(payload)
        case socketsType.EMIT_SHOW_PLAYED_CARDS:
          return showPlayedCards()

        case socketsType.MESSAGE_RECEIVED:
          return broadcastMessage(payload)
        case socketsType.EMIT_ADD_NEW_STORY:
          return sendNewStory(payload)
        case socketsType.EMIT_UPDATE_STORY:
          return sendUpdatedStory(payload)
        case socketsType.EMIT_DELETED_STORY:
          return sendDeletedStory(payload)
        default:
          return
      }
    })

    const addToRoom = data => {
      roomID = data.gameID
      const room = rooms.get(roomID) || {
        scores: [],
        isPlaying: false,
        isRevealing: false,
        currentStory: ''
      }
      user = {
        user: data.user.login,
        score: null
      }
      room.scores = [...room.scores, user]
      rooms.update(roomID, room)
      socket.join(roomID)
      return broadcastSyncGameSession(roomID)
    }

    const setScore = user => {
      const scores = rooms
        .get(roomID)
        .scores.map(
          player =>
            player.user === user.login
              ? { user: user.login, score: user.score }
              : player
        )
      rooms.update(roomID, { scores })
      return broadcastSyncGameSession(roomID)
    }

    const sendCurrentStory = story => {
      const scores = rooms
        .get(roomID)
        .scores.map(p => Object.assign({}, p, { score: null }))
      const currentStory = story
      const isPlaying = false
      const isRevealing = false
      rooms.update(roomID, { scores, currentStory, isPlaying, isRevealing })
      return broadcastSyncGameSession(roomID)
    }

    const sendResetBids = _ => {
      const scores = rooms
        .get(roomID)
        .scores.map(p => Object.assign({}, p, { score: null }))
      const isPlaying = true
      const isRevealing = false
      rooms.update(roomID, { scores, isPlaying, isRevealing })
      return broadcastSyncGameSession(roomID)
    }

    const sendReadyToPlay = () => {
      const isPlaying = true
      const isRevealing = false
      rooms.update(roomID, { isPlaying, isRevealing })
      return broadcastSyncGameSession(roomID)
    }

    const showPlayedCards = () => {
      const isPlaying = false
      const isRevealing = true
      rooms.update(roomID, { isPlaying, isRevealing })
      return broadcastSyncGameSession(roomID)
    }

    const leaveRoom = () => {
      const room = rooms.get(roomID)
      if (typeof room === 'undefined') {
        return
      }
      if (room.scores.length !== 0) {
        const scores = room.scores.filter(player => player.user !== user.user)
        rooms.update(roomID, { scores })
        return broadcastSyncGameSession(roomID)
      }
      rooms.purge(roomID)
      user = null
    }

    const broadcastMessage = payload => {
      io.sockets.in(roomID).emit('action', {
        type: socketsType.BROADCAST_MESSAGE,
        payload
      })
    }

    const sendNewStory = payload => {
      io.sockets.in(roomID).emit('action', {
        type: socketsType.BROADCAST_ADD_NEW_STORY,
        payload
      })
    }

    const sendUpdatedStory = payload => {
      io.sockets.in(roomID).emit('action', {
        type: socketsType.BROADCAST_UPDATE_STORY,
        payload
      })
    }

    const sendDeletedStory = payload => {
      io.sockets.in(roomID).emit('action', {
        type: socketsType.BROADCAST_DELETED_STORY,
        payload
      })
    }

    socket.on('disconnect', () => {
      leaveRoom()
    })
  })
}
