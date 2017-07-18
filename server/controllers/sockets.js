const { curry, prop, __, merge } = require('ramda');
const socketsType = require('./socket.constants');
const { Observable, Subject } = require('rxjs');

const baseEmitMessage = curry((io, room, type, message) =>
  io.sockets.in(room).emit(type, message)
);

module.exports = io => {
  const rooms = {};
  const emitMessage = baseEmitMessage(io);
  const getRoom = prop(__, rooms);

  io.sockets.on('connection', socket => {
    let roomID = '';
    let user = null; //TODO: save in session maybe?

    socket.on('action', ({ type, payload }) => {
      switch (type) {
        case socketsType.ENTER_ROOM:
          return addToRoom(payload);
        case socketsType.LEAVE_ROOM:
          return leaveRoom();
        case socketsType.MESSAGE_RECEIVED:
          return broadcastMessage(payload);
        case socketsType.SEND_SCORE:
          return setScore(payload);
        case socketsType.EMIT_CURRENT_STORY:
          return sendCurrentStory(payload);
        case socketsType.EMIT_ADD_NEW_STORY:
          return sendNewStory(payload);
        case socketsType.EMIT_UPDATE_STORY:
          return sendUpdatedStory(payload);
        case socketsType.EMIT_DELETED_STORY:
          return sendDeletedStory(payload);
        case socketsType.EMIT_RESET_BIDS:
          return sendResetBids(payload);
        case socketsType.EMIT_READY_TO_PLAY:
          return sendReadyToPlay(payload);
        case socketsType.EMIT_SHOW_PLAYED_CARDS:
          return showPlayedCards();
      }
    });

    const addToRoom = data => {
      roomID = data.gameID;
      const room = getRoom(roomID);
      if (typeof getRoom(roomID) === 'undefined') {
        rooms[roomID] = {
          players: [],
          story: null
        };
      }

      user = data.user;
      user.score = null;
      rooms[roomID].players = [...rooms[roomID].players, user];
      socket.join(roomID);
      emitMessage(roomID, 'action', {
        type: socketsType.SYNC_PLAYERS,
        payload: getRoom(roomID).players
      });
      sendCurrentStory(getRoom(roomID).story);
    };

    const broadcastMessage = payload => {
      io.sockets.in(roomID).emit('action', {
        type: socketsType.BROADCAST_MESSAGE,
        payload
      });
    };

    const setScore = user => {
      rooms[roomID].players = rooms[roomID].players.map(
        player => (player.login === user.login ? user : player)
      );
      emitMessage(roomID, 'action', {
        type: socketsType.SYNC_PLAYERS,
        payload: getRoom(roomID).players
      });
    };

    const sendCurrentStory = story => {
      rooms[roomID].story = story;
      const { isPlaying } = rooms[roomID];
      io.sockets.in(roomID).emit('action', {
        type: socketsType.SET_CURRENT_STORY,
        payload: { story, isPlaying }
      });
    };

    const sendNewStory = payload => {
      io.sockets.in(roomID).emit('action', {
        type: socketsType.BROADCAST_ADD_NEW_STORY,
        payload
      });
    };

    const sendUpdatedStory = payload => {
      io.sockets.in(roomID).emit('action', {
        type: socketsType.BROADCAST_UPDATE_STORY,
        payload
      });
    };

    const sendDeletedStory = payload => {
      io.sockets.in(roomID).emit('action', {
        type: socketsType.BROADCAST_DELETED_STORY,
        payload
      });
    };

    const sendResetBids = _ => {
      rooms[roomID].players = rooms[roomID].players.map(
        merge(__, { score: null })
      );
      emitMessage(roomID, 'action', {
        type: socketsType.BROADCAST_RESET_BIDS
      });
    };

    const sendReadyToPlay = payload => {
      rooms[roomID].isPlaying = payload;
      emitMessage(roomID, 'action', {
        type: socketsType.BROADCAST_READY_TO_PLAY,
        payload
      });
    };

    const showPlayedCards = () => {
      emitMessage(roomID, 'action', {
        type: socketsType.BROADCAST_SHOW_PLAYED_CARDS
      });
    };

    const leaveRoom = () => {
      if (typeof rooms[roomID] === 'undefined') {
        return;
      }
      rooms[roomID].players = rooms[roomID].players.filter(player => {
        return player.login !== user.login;
      });
      user = null;
      if (rooms[roomID].players.length !== 0) {
        emitMessage(roomID, 'action', {
          type: socketsType.SYNC_PLAYERS,
          payload: getRoom(roomID).players
        });
      }
      delete rooms[roomID];
    };

    socket.on('disconnect', () => {
      leaveRoom();
    });
  });
};
