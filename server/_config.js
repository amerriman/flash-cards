var config = {};

config.mongoURI = {
  development: process.env.DB_HOST,
  production: process.env.MONGOLAB_URI
};

module.exports = config;
