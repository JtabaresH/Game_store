const express = require('express')

// Routers
const {  } = require('./routes/')
const {  } = require('./routes/')
const {  } = require('./routes/')
const {  } = require('./routes/')
const {  } = require('./routes/')

// Models
const { User } = require('./models/users.model')
const { Console } = require('./models/consoles.model')
const { GameInConsole } = require('./models/gamesInConsoles.model')
const { Game } = require('./models/games.model')
const { Review } = require('./models/reviews.model')

// Utils
const { db } = require('./utils/database.util')

// Init express app
const app = express()
app.use(express.json())

// Define endpoints
app.use('/api/v1/', )
app.use('/api/v1/', )

// Authenticate sync and listen server
db.authenticate()
.then(() => console.log('db authenticated'))
.catch(err => console.log(err));

// Establish models relations


db.sync()
.then(() => console.log('db create or synced'))
.catch(err => console.log(err));

app.listen(4030, () => {
    console.log('Server listening at http://localhost:4040')
})