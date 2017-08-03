const { path, find, useWith, curryN } = require('ramda');
const { ObjectID } = require('mongodb');

const User = require('../models/user');
const { findByIDInCollection, throwIfUndefined } = require('../utils');

const createNewGame = ({ title, description }) => ({
  title,
  description,
  stories: []
});

const findGameById = curryN(
  2,
  useWith(find, [findByIDInCollection, path(['games'])])
);

const add = (userID, game) =>
  User.findByIdAndUpdate(
    userID,
    {
      $push: {
        games: createNewGame(game)
      }
    },
    { safe: true, upsert: true, new: true }
  );

const search = (login, gameID) =>
  User.findOne({ login })
    .then(findGameById(gameID))
    .then(throwIfUndefined('Game not found'));

const remove = (userID, gameID) =>
  User.findByIdAndUpdate(userID, {
    $pull: { games: { _id: ObjectID(gameID) } }
  });

module.exports = {
  add,
  search,
  remove,
  findGameById
};
