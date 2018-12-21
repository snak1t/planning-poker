import React, { useState, useEffect } from 'react';

import { WebAuth } from 'auth0-js';

const properties = {
    clientID: process.env.REACT_APP_AUTH_CLIENT_ID,
    domain: process.env.REACT_APP_AUTH_DOMAIN,
    responseType: 'token id_token',
    audience: process.env.REACT_APP_AUTH_AUDIENCE,
    redirectUri: process.env.REACT_APP_AUTH_REDIRECT_URL,
    scope: 'openid profile email',
};

const auth0Client = new WebAuth({ ...properties });

const useAuthSession = async cb => {
    useEffect(() => {
        auth0Client.checkSession({ prompt: 'none' }, cb);
    }, []);
};

const login = () => {
    auth0Client.authorize();
};

const logout = () => {
    auth0Client.logout();
};

const parseHash = () => {
    return new Promise((resolve, reject) => {
        auth0Client.parseHash((err, authResult) => {
            if (err) {
                reject(err);
            } else {
                resolve(authResult);
            }
        });
    });
};

export const LOGIN_STATUS = {
    NOT_ASKED: 'NOT_ASKED',
    LOGGED_IN: 'LOGGED_IN',
    LOGGED_OUT: 'LOGGED_OUT',
    TEMP_USER: 'TEMP_USER',
};

export const AuthContext = React.createContext();
export function AuthProvider({ children }) {
    const [user, setUser] = useState({ loginStatus: LOGIN_STATUS.NOT_ASKED, info: null });
    // const [accessToken, setAccessToken] = useState(null);
    // const [idToken, setIdToken] = useState(null);

    useAuthSession(async (err, authData) => {
        try {
            const parsedData = err ? await parseHash() : authData;
            // setAccessToken(parsedData.accessToken);
            // setIdToken(parsedData.idToken);
            if (parsedData) {
                setUser({ loginStatus: LOGIN_STATUS.LOGGED_IN, info: parsedData.idTokenPayload });
            } else {
                setUser({ loginStatus: LOGIN_STATUS.LOGGED_OUT, info: null });
            }

            window.location.hash = '';
        } catch (error) {}
    });
    const setTempUser = login => {
        setUser({
            loginStatus: LOGIN_STATUS.TEMP_USER,
            info: {
                name: login,
                email: login,
                avatar: '',
            },
        });
    };
    return <AuthContext.Provider value={{ login, logout, user, setTempUser }}>{children}</AuthContext.Provider>;
}

export const AuthConsumer = AuthContext.Consumer;

export const checkIsAdmin = (user, userToMatch) =>
    user.loginStatus === LOGIN_STATUS.LOGGED_IN && userToMatch === user.info.email;
