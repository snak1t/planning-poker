const User = require('../models/user');

const {
    last,
    path,
    find,
    map,
    mergeAll,
    filter,
    curry,
    not,
    compose,
    when,
    prop,
    lens,
    length,
    over,
} = require('ramda');

const getLoginFromRequest = path(['body', 'login']);
const getGameID = path(['body', 'gameID']);
const findByIdInCollection = id => find(item => item._id.toString() === id);
const ifIdEquals = curry((test, where) => {
    if (typeof test === 'string') {
        return where._id.toString() === test;
    }
    return where._id.toString() === test._id;
});
const mutableAssoc = curry((prop, val, obj) => {
    obj[prop] = val;
    return obj;
});
const storiesLens = lens(prop('stories'), mutableAssoc('stories'));
const gameLens = lens(prop('games'), mutableAssoc('games'));

module.exports = app => {
    app.post('/api/game', async (req, res) => {
        const userID = req.session.passport.user;
        const newGame = {
            title: req.body.title,
            description: req.body.description,
            stories: [],
        };
        try {
            const user = await User.findOne({ _id: userID });
            user.games = [...user.games, newGame];
            await user.save();
            res.json({ game: last(user.games) });
        } catch (error) {
            console.log(error);
        }
    });

    app.post('/api/game/find', async (req, res) => {
        try {
            const user = await User.findOne({ login: getLoginFromRequest(req) });
            const findByGameId = findByIdInCollection(getGameID(req));
            const game = await findByGameId(user.games);
            if (typeof game === 'undefined') throw new Error('Game not found');
            res.json({ game });
        } catch (error) {
            console.log(error);
        }
    });

    app.delete('/api/game/story', async (req, res) => {
        try {
            const { login, gameID, storyID } = req.query;
            const user = await User.findOne({ login });
            const idNotEquals = compose(
                not,
                ifIdEquals(storyID),
            );
            const removeStory = when(ifIdEquals(gameID), over(storiesLens, filter(idNotEquals)));
            const updateUserGames = over(gameLens, map(removeStory));
            updateUserGames(user);
            await user.save();
            res.json({
                deleted: true,
                id: storyID,
            });
        } catch (error) {
            console.log(error);
        }
    });

    app.delete('/api/game/:gameId', async (req, res) => {
        const { gameId } = req.params;
        const userID = req.session.passport.user;
        try {
            const user = await User.findOne({ _id: userID });
            user.games = user.games.filter(g => g._id.toString() !== gameId);
            await user.save();
            res.json({
                deleted: true,
                id: gameId,
            });
        } catch (e) {
            console.log(e);
        }
    });

    app.post('/api/game/story', async (req, res) => {
        try {
            const userID = req.session.passport.user;
            const user = await User.findOne({ _id: userID });
            const { all: stories } = req.body;
            const newStories = stories.map(st => {
                return {
                    title: st.title,
                    description: st.description,
                    score: st.score,
                    active: st.active,
                };
            });
            const numberOfStories = length(stories);
            const games = map(game => {
                if (game._id.toString() === req.body.gameID) {
                    game.stories = [...game.stories, ...newStories];
                }
                return game;
            }, user.games);
            user.games = games;
            await user.save();
            const findByGameId = findByIdInCollection(getGameID(req));
            const game = await findByGameId(user.games);
            return res.json({ stories: game.stories.slice(-numberOfStories) });
        } catch (e) {
            console.log(e);
        }
    });

    app.put('/api/game/story', async (req, res) => {
        const { login, gameID, story } = req.body;
        const user = await User.findOne({ login });
        let updatedStory = null;
        user.games = user.games.map(game => {
            if (ifIdEquals(gameID, game)) {
                game.stories = game.stories.map(gs => {
                    if (ifIdEquals(story, gs)) {
                        for (let key in story) {
                            gs[key] = story[key];
                        }
                        updatedStory = gs;
                        return updatedStory;
                    }
                    return gs;
                });
            }
            return game;
        });
        await user.save();
        res.json({ story: updatedStory.toObject() });
    });
};
