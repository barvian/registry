'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clean = exports.watch = exports.build = undefined;

var _gulp = require('gulp');

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

// Build
// -----

function build(config, gulp) {
  return (0, _gulp.src)(config.src, config.base ? {
    base: config.base,
    cwd: config.base,
    dot: true,
    since: gulp.lastRun('copy:build')
  } : { since: gulp.lastRun('copy:build') }).pipe((0, _gulpMultidest2.default)(config.dest)).pipe((0, _browserSync.stream)());
}
build.displayName = 'copy:build';
build.description = 'Build copies';

exports.build = build;

// Watch
// -----

function watch(config) {
  (0, _gulp.watch)(config.src, function () {
    return build(config);
  });
}
watch.displayName = 'copy:watch';
watch.description = 'Watch fonts for changes and re-build';

exports.watch = watch;

// Clean
// -----

function clean(config) {
  return config.base ? Promise.all((0, _arrayFlatten2.default)([config.dest]).map(function (dest) {
    return (0, _del2.default)(config.src, { cwd: dest, dot: true });
  })) : (0, _del2.default)((0, _arrayFlatten2.default)([config.dest]));
}
clean.displayName = 'copy:clean';
clean.description = 'Clean copies';

exports.clean = clean;