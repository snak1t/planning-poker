const { getUserIDfromSession } = require('../utils');

const storyService = require('../services/story.service');

const addStory = (request, response) =>
  storyService
    .add({
      userID: getUserIDfromSession(request),
      gameID: request.body.gameID,
      stories: request.body.all
    })
    .then(stories => response.json({ stories }))
    .catch(error => console.error(error));

const updateStory = ({ body: { login, gameID, story } }, response) =>
  storyService
    .update({
      login,
      gameID,
      story
    })
    .then(story => response.json({ story: story.toObject() }))
    .catch(error => console.error(error));

const deleteStory = ({ body: { login, storyID, gameID } }, response) =>
  storyService
    .remove({
      login,
      storyID,
      gameID
    })
    .then(() => {
      response.json({
        deleted: true,
        id: storyID
      });
    });

module.exports = {
  addStory,
  updateStory,
  deleteStory
};
