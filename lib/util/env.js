'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dev = exports.prod = undefined;

var _gulpUtil = require('gulp-util');

var env = _gulpUtil.env.env || 'development';

var prod = exports.prod = function prod() {
  return env == 'production';
};
var dev = exports.dev = function dev() {
  return env == 'development';
};
exports.default = env;