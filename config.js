const env = process.env.NODE_ENV || 'development';
const config = env === 'production' ?  require('./config.production.json') : require('./config.json');

console.log(`app loaded with env : ${env}`);

module.exports = config;