const { ObjectID } = require('mongodb');
const { compose, converge, identity } = require('ramda');

const User = require('../models/user');
const { findGameById } = require('./game.service');
const { mergeDocument, getDeeplyNestedDocument } = require('../utils');

const getNLastStories = n => ({ stories }) => stories.slice(-n);
const deeplyUpdateStory = (gameID, story) =>
  compose(
    mergeDocument(story),
    getDeeplyNestedDocument([['games', gameID], ['stories', story._id]])
  );

const updateAndSaveStory = (gameID, story) =>
  converge(identity, [deeplyUpdateStory(gameID, story), user => user.save()]);

const add = ({ userID, gameID, stories }) =>
  User.findOneAndUpdate(
    {
      _id: userID,
      'games._id': ObjectID(gameID)
    },
    {
      $pushAll: {
        'games.$.stories': stories
      }
    },
    { safe: true, upsert: true, new: true }
  )
    .then(findGameById(gameID))
    .then(getNLastStories(stories.length));

const update = ({ login, gameID, story }) =>
  User.findOne({ login }).then(updateAndSaveStory(gameID, story));

const remove = ({ login, gameID, storyID }) =>
  User.findOne({ login }).then(user => {
    const stories = user.games.id(gameID).stories;
    user.games.id(gameID).stories = stories.filter(
      story => story._id.toString() !== storyID
    );
    return user.save();
  });

module.exports = {
  add,
  update,
  remove
};
