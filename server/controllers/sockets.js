const curry = require('ramda/src/curry')
const { createStore } = require('./mini-redux')
const socketsType = require('./socket.constants')

const SYNC_GAME_SESSION = '[sockets] SYNC_GAME_SESSION'

module.exports = io => {
  const rooms = createStore()

  const broadcastSyncGameSession = (id, data) =>
    io.sockets.in(id).emit('action', {
      type: SYNC_GAME_SESSION,
      payload: data
    })

  io.sockets.on('connection', socket => {
    let roomID = ''
    let user = null //TODO: save in session maybe?
    let subscription
    const fastForwardWithType = curry((type, payload) => {
      io.sockets.in(roomID).emit('action', {
        type,
        payload
      })
    })
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
          return fastForwardWithType(socketsType.BROADCAST_MESSAGE)
        case socketsType.EMIT_ADD_NEW_STORY:
          return fastForwardWithType(socketsType.BROADCAST_ADD_NEW_STORY)
        case socketsType.EMIT_UPDATE_STORY:
          return fastForwardWithType(socketsType.BROADCAST_UPDATE_STORY)
        case socketsType.EMIT_DELETED_STORY:
          return fastForwardWithType(socketsType.BROADCAST_DELETED_STORY)
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

      socket.join(roomID)
      subscription = rooms.subscribe(roomID, data =>
        broadcastSyncGameSession(roomID, data)
      )
      return rooms.update(roomID, room)
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
      return rooms.update(roomID, { scores })
    }

    const dropScores = (roomID, rooms) =>
      rooms.get(roomID).scores.map(p => Object.assign({}, p, { score: null }))

    const sendCurrentStory = story => {
      const scores = dropScores(roomID, rooms)
      const currentStory = story
      const isPlaying = false
      const isRevealing = false
      return rooms.update(roomID, {
        scores,
        currentStory,
        isPlaying,
        isRevealing
      })
    }

    const sendResetBids = _ => {
      const scores = dropScores(roomID, rooms)
      const isPlaying = true
      const isRevealing = false
      return rooms.update(roomID, { scores, isPlaying, isRevealing })
    }

    const sendReadyToPlay = () => {
      const isPlaying = true
      const isRevealing = false
      return rooms.update(roomID, { isPlaying, isRevealing })
    }

    const showPlayedCards = () => {
      const isPlaying = false
      const isRevealing = true
      return rooms.update(roomID, { isPlaying, isRevealing })
    }

    const leaveRoom = () => {
      const room = rooms.get(roomID)
      if (typeof subscription === 'function') {
        subscription()
      }
      if (typeof room === 'undefined') {
        return
      }
      if (room.scores.length !== 0) {
        const scores = room.scores.filter(player => player.user !== user.user)
        return rooms.update(roomID, { scores })
      }
      rooms.purge(roomID)
      user = null
    }

    socket.on('disconnect', () => {
      leaveRoom()
    })
  })
}
