'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const drinkModel = require('./drink/model.js');
const foodModel = require('./food/model.js');
const userModel = require('./users.js');
const Collection = require('./data-collection.js');

const DATABASE_URL = process.env.DATABASE_URL || 'sqlite::memory:';

const sequelize = new Sequelize(DATABASE_URL, {logging: false});
const food = foodModel(sequelize, DataTypes);
const drink = drinkModel(sequelize, DataTypes);
const user = userModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  food: new Collection(food),
  drinks: new Collection(drink),
  user,
};
