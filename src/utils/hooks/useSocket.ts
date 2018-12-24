import { useEffect } from 'react';
import { socket } from '../../Data/socket';

export const useSocket = <T extends object>(types: T) => {
    useEffect(() => {
        for (let [type, cb] of Object.entries(types)) {
            socket.on(type, cb);
        }
        return () => {
            for (let [type, cb] of Object.entries(types)) {
                socket.removeEventListener(type, cb);
            }
        };
    }, []);
    return (type: string, data: unknown) => {
        socket.emit(type, data);
    };
};
