const morgan = require('morgan');

// Custom request logger — uses morgan in dev, minimal in production
const logger = (env) => {
  if (env === 'development') {
    return morgan('dev');
  }
  return morgan('combined');
};

module.exports = logger;
