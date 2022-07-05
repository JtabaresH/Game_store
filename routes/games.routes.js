const express = require('express');

// Controllers
const {
  getAllGames,
  createGame,
  updateGame,
  deleteGame,
  reviewGame,
  assignGameToConsole,
} = require('../controllers/games.controller');

const {
  createGameValidators,
  createReviewValidators,
} = require('../middlewares/validators.middleware');

const { gameExists } = require('../middlewares/games.middleware');

const {
  protectSession,
  protectUserAccount,
} = require('../middlewares/auth.middleware');

const gamesRouter = express.Router();

gamesRouter.get('/', getAllGames);

gamesRouter.use(protectSession);

gamesRouter.post('/', createGameValidators, createGame, assignGameToConsole);

gamesRouter
  .use('/:id', gameExists)
  .route('/:id')
  .patch(protectUserAccount, updateGame)
  .delete(protectUserAccount, deleteGame);

gamesRouter.post(
  '/reviews/:gameId',
  createReviewValidators,
  protectUserAccount,
  reviewGame
);

module.exports = { gamesRouter };