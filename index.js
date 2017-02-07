'use strict';

const cron = require('node-cron');
const config = require('./config');
const comics = require('./comics');

cron.schedule('* */24 * * *', () => {
  console.log('running a task every 24 hours');
  const source = config.rssList[0];
  // const l = config.rssList.length;
  // const r = Math.random() * 10 * l % l
  // const source = Math.floor(r);
  console.log(`Selected ${source}`);
  comics(source);
});
