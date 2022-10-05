'use strict';

const { db } = require('./src/models');
const { start } = require('./src/server.js');

db.sync()
  .then(() => {
    console.log('Successfully connected to Database!');
    start();
  })
  .catch((e) => console.error(e));


