/* global io */
import { createStore, combineReducers, applyMiddleware } from 'redux'
import createSocketIoMiddleware from 'redux-socket.io'

import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

// reducers
import { chatMessages } from './Chat/reducer'
import { stories } from './Stories/reducer'
import { user } from './Auth/reducer'
import games from './Games/reducer'
import { players } from './Player/reducer'
import error from './Error/reducer'

const socket = io.connect('/')
const middlewares = [thunk, createSocketIoMiddleware(socket, '[sockets] ')]

const reducers = {
  chatMessages,
  stories,
  user,
  games,
  players,
  error
}

export const store = createStore(
  combineReducers(reducers),
  composeWithDevTools(applyMiddleware(...middlewares))
)
