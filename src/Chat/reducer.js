import socketConst from '../../server/controllers/socket.constants'

export const chatMessages = (store = [], { type, payload }) => {
  switch (type) {
    case socketConst.BROADCAST_MESSAGE:
      return [...store, payload]
    default:
      return store
  }
}
