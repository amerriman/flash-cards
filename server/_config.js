var config = {};

config.mongoURI = {
  development: process.env.DB_HOST,
  production: process.env.DB_PRODUCTION
};

module.exports = config;
