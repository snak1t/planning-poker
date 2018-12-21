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

const generateRandomId = () => Math.round(Math.random() * 11);
const maleAvatars = [1, 3, 5, 8, 10, 12, 13, 15, 17, 20, 22, 24];
const femaleAvatars = [2, 3, 6, 7, 8, 11, 14, 16, 18, 19, 21, 23];

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
    const setTempUser = (login, gender) => {
        setUser({
            loginStatus: LOGIN_STATUS.TEMP_USER,
            info: {
                name: login,
                email: login,
                picture: gender === 'male' ? maleAvatars[generateRandomId()] : femaleAvatars[generateRandomId()],
            },
        });
    };
    return <AuthContext.Provider value={{ login, logout, user, setTempUser }}>{children}</AuthContext.Provider>;
}

export const AuthConsumer = AuthContext.Consumer;

export const checkIsAdmin = (user, userToMatch) =>
    user.loginStatus === LOGIN_STATUS.LOGGED_IN && userToMatch === user.info.email;
