import { useEffect } from 'react';
import { socket } from '../../Data/socket';

export const useSocket = (types, cb) => {
    useEffect(() => {
        const listener = data => {
            if (types.includes(data.type)) {
                cb(data);
            }
        };
        socket.on('action', listener);
        return () => socket.removeEventListener('action', listener);
    }, []);
    return data => {
        socket.emit('action', data);
    };
};
