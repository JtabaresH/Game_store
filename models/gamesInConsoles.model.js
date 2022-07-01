const { db, DataTypes } = require('../utils/database.util')

// Create model
const GameInConsole = db.define('gameInConsole', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    gameId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    consoleId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active'
    }
})

module.exports = { GameInConsole }