import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSocketIoMiddleware from 'redux-socket.io';

import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

//reducers
import { stories } from './Stories/reducer';
import playSession from './PlaySession/reducer';

import openSocket from 'socket.io-client';
export const socket = openSocket('/');
const middlewares = [thunk, createSocketIoMiddleware(socket, '[sockets] ')];

const reducers = {
    stories,
    playSession,
};

export const store = createStore(combineReducers(reducers), composeWithDevTools(applyMiddleware(...middlewares)));
