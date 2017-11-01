const { path, last } = require('ramda');

const gameService = require('../services/game.service');
const { getLoginFromRequest, getUserIDfromSession } = require('../utils');

const getGameID = path(['body', 'gameID']);
const handleError = e => console.error(e);

const findGame = (request, response) =>
  gameService
    .search(getLoginFromRequest(request), getGameID(request))
    .then(game => response.json({ game }))
    .catch(handleError);

const saveGame = (request, response) =>
  gameService
    .add(getUserIDfromSession(request), request.body)
    .then(user => response.json({ game: last(user.games) }))
    .catch(handleError);

const deleteGame = (request, response) => {
  const { gameID } = request.body;
  gameService
    .remove(getUserIDfromSession(request), gameID)
    .then(() =>
      response.json({
        deleted: true,
        id: gameID
      })
    )
    .catch(handleError);
};

module.exports = {
  findGame,
  saveGame,
  deleteGame
};
