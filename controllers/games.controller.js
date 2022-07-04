// Models
const { Game } = require('../models/game.model');
const { Review } = require('../models/review.model');
const { Console } = require('../models/console.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');

const createGame = catchAsync(async (req, res, next) => {
    const { title, genre } = req.body;
    const newGame = await Game.create({
        title,
        genre,
    });

    res.status(201).json({
        status: 'success',
        newGame,
    });
});

const getAllGames = catchAsync(async (req, res, next) => {
    const games = await Game.findAll({
        include: [{ model: Console }, { model: Review }],
    });

    res.status(200).json({
        status: 'success',
        games,
    });
});

const updateGame = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const { title } = req.body

    const game = await Game.findOne({ where: { id } })
    
    await game.update({ title })

    res.status(201).json({ 
        status: 'success', 
        game 
    })
})

const deleteGame = catchAsync(async (req, res, next) => {
    const { game } = req;
    await game.update({ status: 'inactive' });
    res.status(201).json({ status: 'success', game });
});

const reviewGame = catchAsync(async (req, res, next) => {
    const { sessionUser, game } = req;

    const { comment } = req.body;

    const newReview = await Review.create({
        userId: sessionUser.id,
        gameId: game.id,
        comment,
    });

    res.status(201).json({
        status: 'success',
        newReview,
    });
});

module.exports = {
    getAllGames,
    createGame,
    updateGame,
    deleteGame,
    reviewGame,
};