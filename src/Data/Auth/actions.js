import socketTypes from '../../socket.constants';

export const addUserToStore = user => ({
    type: '[user] LOGIN_USER',
    payload: user,
});

export const enterRoom = payload => ({
    type: socketTypes.ENTER_ROOM,
    payload,
});
