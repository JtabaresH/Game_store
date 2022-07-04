const express = require('express');

// Controllers
const {
  getAllConsoles,
  createConsole,
  updateConsole,
  deleteConsole,
} = require('../controllers/consoles.controller');

const {
  createConsoleValidators,
} = require('../middlewares/validators.middleware');

const { consoleExists } = require('../middlewares/consoles.middleware');

const {
  protectSession,
  protectUserAccount,
} = require('../middlewares/auth.middleware');

const consolesRouter = express.Router();

consolesRouter.get('/', getAllConsoles);

consolesRouter.use(protectSession);

consolesRouter.post('/', createConsoleValidators, createConsole);

consolesRouter
  .use('/:id', consoleExists)
  .route('/:id')
  .patch(
    // protectUserAccount,
    updateConsole
  )
  .delete(
    // protectUserAccount,
    deleteConsole
  );

module.exports = { consolesRouter };