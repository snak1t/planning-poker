const {
  findGame,
  saveGame,
  deleteGame
} = require('../controllers/game.controller');

const {
  addStory,
  updateStory,
  deleteStory
} = require('../controllers/story.controller.js');

module.exports = app => {
  app.post('/api/game', saveGame);
  app.post('/api/game/find', findGame);
  app.delete('/api/game', deleteGame);

  app.post('/api/game/story', addStory);
  app.put('/api/game/story', updateStory);
  app.delete('/api/game/story', deleteStory);
};
