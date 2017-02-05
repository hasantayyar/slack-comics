const cron = require('node-cron');
const config = require('./config');
const comics = require('./comics');

comics();

cron.schedule('*/2 * * * *', function() {
	console.log('running a task every 24 hours');
});