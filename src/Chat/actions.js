import socketConst from '../../server/controllers/socket.constants';

export const emitMessage = payload => ({
  type: socketConst.MESSAGE_RECEIVED,
  payload
});

export const addMessage = message => ({
  type: '[chatMessages] ADD_MESSAGE',
  payload: message
});
