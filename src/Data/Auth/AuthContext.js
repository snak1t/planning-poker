import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import { addUserToStore } from './actions';
import { message } from 'antd';

/**
 * TODO: Right now during the fetch of the user,
 * we also get the games array that currently stored inside redux.
 * During Games Store refactoring remove the connect from here
 */
const mapDTP = {
    addUserToStore,
};

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

export const AuthProvider = connect(
    null,
    mapDTP,
)(function AuthProvider({ children, addUserToStore }) {
    const [user, setUser] = useState({ login: '', logStatus: LOG_STATUS.NOT_ASKED });

    useEffect(() => {
        (async () => {
            try {
                const { data: userData } = await Axios.get(AUTH_URLS.getUser);
                addUserToStore(userData);
                if (userData.login) {
                    return setUser({
                        logStatus: LOG_STATUS.LOGGED_IN,
                        login: userData.login,
                    });
                }
                setUser({
                    login: '',
                    logStatus: LOG_STATUS.LOGGED_OUT,
                });
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    const makeResponse = url => async userData => {
        try {
            const { data: userResponse } = await Axios.post(url, userData);
            if (userResponse.error) {
                throw new Error(userResponse.error);
            }
            addUserToStore(userResponse);

            setUser({ login: userResponse.login, logStatus: LOG_STATUS.LOGGED_IN });
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
            setUser({
                login: '',
                logStatus: LOG_STATUS.LOGGED_OUT,
            });
        } catch (error) {
            message.error(error.message);
        }
    };

    return (
        <AuthContext.Provider value={{ ...user, setUser, signIn, signUp, signOut }}>{children}</AuthContext.Provider>
    );
});

export const AuthConsumer = AuthContext.Consumer;

export const checkIsAdmin = (user, userToMatch) => user.logStatus === 'LOGGED_IN' && userToMatch === user.login;
