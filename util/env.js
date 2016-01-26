'use strict';

const params = require('gulp-util').env;

function env() {
  return params.env || 'development';
}

module.exports = env;
module.exports.prod = () => env() === 'production';
module.exports.dev = () => env() === 'development';
