'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clean = exports.watch = exports.build = exports.defaultConfig = exports.configurable = undefined;

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _gulpMultidest = require('../util/gulp-multidest');

var _gulpMultidest2 = _interopRequireDefault(_gulpMultidest);

var _browserSync = require('./browserSync');

var _del = require('del');

var _del2 = _interopRequireDefault(_del);

var _arrayFlatten = require('array-flatten');

var _arrayFlatten2 = _interopRequireDefault(_arrayFlatten);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copy
// ====

var configurable = exports.configurable = true;
var defaultConfig = exports.defaultConfig = {};

// Build
// -----

function build() {
  var config = Object.assign({}, defaultConfig, this);

  return _gulp2.default.src(config.src, {
    base: config.base,
    cwd: config.base,
    dot: true,
    since: _gulp2.default.lastRun('copy:build')
  }).pipe((0, _gulpMultidest2.default)(config.dest)).pipe((0, _browserSync.stream)());
}
build.displayName = 'copy:build';
build.description = 'Build copies';

exports.build = build;

// Watch
// -----

function watch() {
  var config = Object.assign({}, defaultConfig, this);

  _gulp2.default.watch(config.src, build.bind(this));
}
watch.displayName = 'copy:watch';
watch.description = 'Watch fonts for changes and re-build';

exports.watch = watch;

// Clean
// -----

function clean() {
  var config = Object.assign({}, defaultConfig, this);

  return Promise.all((0, _arrayFlatten2.default)([config.dest]).map(function (dest) {
    return (0, _del2.default)(config.src, { cwd: dest, dot: true });
  }));
}
clean.displayName = 'copy:clean';
clean.description = 'Clean copies';

exports.clean = clean;