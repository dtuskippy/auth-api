'use strict';

const drinkModel = (sequelize, DataTypes) => sequelize.define('Drinks', {
  beer: {
    type: DataTypes.ENUM,
    values: ['Amber Ale', 'Brown Ale', 'Doppelbock', 'IPA', 'Pilsner', 'Porter', 'Stout'],
    required: false,
  },
  mixed: {
    type: DataTypes.ENUM,
    values: ['Cosmo', 'Daiquiri', 'Irish Coffee', 'Mai Tai', 'Martini', 'Old-Fashioned'],
    required: false,
  },
  non: {
    type: DataTypes.ENUM,
    values: ['Arnold Palmer', 'Chai', 'Coffee', 'Horchata', 'Tea', 'Water'],
    required: false,
  },
});

module.exports = drinkModel;

