const express = require('express')

// Routers
const { usersRouter } = require('./routes/users.routes')
const { gamesRouter } = require('./routes/games.routes')
const { consolesRouter } = require('./routes/consoles.routes')

// Models
const { User } = require('./models/user.model')
const { Console } = require('./models/console.model')
const { Game } = require('./models/game.model')
const { Review } = require('./models/review.model')

// Utils
const { db } = require('./utils/database.util')

// Init express app
const app = express()
app.use(express.json())

// Define endpoints
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/games', gamesRouter)
/* app.use('/api/v1/consoles', consolesRouter) */

// Authenticate sync and listen server
db.authenticate()
.then(() => console.log('db authenticated'))
.catch(err => console.log(err));

// Establish models relations
    // Users and Review Relation 1 --> M
    User.hasMany(Review, { foreignKey: 'userId' })
    Review.belongsTo(User)
    // Games and Review Relation 1 --> M
    Game.hasMany(Review, { foreignKey: 'gameId' })
    Review.belongsTo(Game)
    // Games and GamesInConsole Relation M --> M
    Game.belongsToMany(Console, { foreignKey: 'consoleId', through: 'gameInConsole' })
    // Console and GamesInConsoles Relation M --> M
    Console.belongsToMany(Game, { foreignKey: 'gameId', through: 'gameInConsole' })


db.sync()
.then(() => console.log('db create or synced'))
.catch(err => console.log(err));

app.listen(4040, () => {
    console.log('Server listening at http://localhost:4040')
})