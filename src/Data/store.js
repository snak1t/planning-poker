import { createStore, combineReducers, applyMiddleware } from 'redux'
import createSocketIoMiddleware from 'redux-socket.io'

import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

//reducers
import { chatMessages } from './Chat/reducer'
import { stories } from './Stories/reducer'
import { user } from './Auth/reducer'
import games from './Games/reducer'
import playSession from './PlaySession/reducer'
import error from './Error/reducer'

import openSocket from 'socket.io-client'
const socket = openSocket('http://localhost:3000')
const middlewares = [thunk, createSocketIoMiddleware(socket, '[sockets] ')]

const reducers = {
  chatMessages,
  stories,
  user,
  games,
  playSession,
  error
}

export const store = createStore(
  combineReducers(reducers),
  composeWithDevTools(applyMiddleware(...middlewares))
)
