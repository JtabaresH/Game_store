const { db, DataTypes } = require('../utils/database.util');

// Create our first model (table)
const GameInConsole = db.define(
  'gameInConsole',
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
    },
    gameId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    consoleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'active',
    },
  },
  { timestamps: false }
);

module.exports = { GameInConsole };
