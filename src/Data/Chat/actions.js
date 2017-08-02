import socketConst from '../../socket.constants'

export const emitMessage = payload => {
  return {
    type: socketConst.MESSAGE_RECEIVED,
    payload
  }
}
