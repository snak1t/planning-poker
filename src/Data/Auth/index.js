import socketTypes from '../../socket.constants';

export const enterRoom = payload => ({
    type: socketTypes.ENTER_ROOM,
    payload,
});
