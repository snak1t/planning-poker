import React, { useState } from 'react';
import Axios from 'axios';
import { message } from 'antd';
import { useAsyncEffect } from '../../utils/hooks/useAsyncEffect';

const merge = chunk => otherChunk => ({ ...otherChunk, ...chunk });

export const LOG_STATUS = {
    NOT_ASKED: 'NOT_ASKED',
    LOGGED_IN: 'LOGGED_IN',
    LOGGED_OUT: 'LOGGED_OUT',
    TEMP_USER: 'TEMP_USER',
};

export const AuthContext = React.createContext();

const AUTH_URLS = {
    getUser: '/api/user',
    signIn: '/api/login',
    signUp: '/api/signup',
    signOut: '/api/logout',
};

const generateRandomId = () => Math.round(Math.random() * 23);
export const AuthProvider = function AuthProvider({ children }) {
    const [user, setUser] = useState({ login: '', logStatus: LOG_STATUS.NOT_ASKED, avatar: generateRandomId() });

    useAsyncEffect(async () => {
        try {
            const { data: userData } = await Axios.get(AUTH_URLS.getUser);
            if (userData.login) {
                return setUser(
                    merge({
                        logStatus: LOG_STATUS.LOGGED_IN,
                        login: userData.login,
                    }),
                );
            }
            setUser(
                merge({
                    login: '',
                    logStatus: LOG_STATUS.LOGGED_OUT,
                }),
            );
        } catch (error) {
            console.error(error);
        }
    }, []);

    const makeResponse = url => async userData => {
        try {
            const { data: userResponse } = await Axios.post(url, userData);
            if (userResponse.error) {
                throw new Error(userResponse.error);
            }
            setUser(merge({ login: userResponse.login, logStatus: LOG_STATUS.LOGGED_IN }));
        } catch (error) {
            message.error(error.message);
        }
    };

    const signIn = makeResponse(AUTH_URLS.signIn);
    const signUp = makeResponse(AUTH_URLS.signUp);
    const signOut = async () => {
        try {
            const { data } = await Axios.get(AUTH_URLS.signOut);
            if (!data.logout) {
                throw new Error('Unable to logout');
            }
            setUser(
                merge({
                    login: '',
                    logStatus: LOG_STATUS.LOGGED_OUT,
                }),
            );
        } catch (error) {
            message.error(error.message);
        }
    };

    const mergedSetUser = data => setUser(merge(data));

    return (
        <AuthContext.Provider value={{ ...user, setUser: mergedSetUser, signIn, signUp, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const AuthConsumer = AuthContext.Consumer;

export const checkIsAdmin = (user, userToMatch) => user.logStatus === 'LOGGED_IN' && userToMatch === user.login;
