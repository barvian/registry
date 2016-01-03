'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clean = exports.watch = exports.build = exports.defaultConfig = exports.configurable = undefined;

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _gulpMultidest = require('../util/gulp-multidest');

var _gulpMultidest2 = _interopRequireDefault(_gulpMultidest);

var _gulpImagemin = require('gulp-imagemin');

var _gulpImagemin2 = _interopRequireDefault(_gulpImagemin);

var _gulpIf = require('gulp-if');

var _gulpIf2 = _interopRequireDefault(_gulpIf);

var _imageminPngquant = require('imagemin-pngquant');

var _imageminPngquant2 = _interopRequireDefault(_imageminPngquant);

var _browserSync = require('./browserSync');

var _del = require('del');

var _del2 = _interopRequireDefault(_del);

var _arrayFlatten = require('array-flatten');

var _arrayFlatten2 = _interopRequireDefault(_arrayFlatten);

var _env = require('../util/env');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Images
// ======

var configurable = exports.configurable = true;
var defaultConfig = exports.defaultConfig = {
  minify: (0, _env.prod)(),
  imagemin: {
    progressive: true,
    interlaced: true,
    svgoPlugins: [{ removeViewBox: false }],
    use: [(0, _imageminPngquant2.default)()]
  }
};

// Build
// -----

function build() {
  var config = Object.assign({}, defaultConfig, this);

  return _gulp2.default.src(config.src /*, {since: gulp.lastRun('images:build')}*/).pipe((0, _gulpIf2.default)(config.minify, (0, _gulpImagemin2.default)(config.imagemin))).pipe((0, _gulpMultidest2.default)(config.dest)).pipe((0, _browserSync.stream)());
}
build.displayName = 'images:build';
build.description = 'Compress images';

exports.build = build;

// Watch
// -----

function watch() {
  var config = Object.assign({}, defaultConfig, this);

  _gulp2.default.watch(config.src, build.bind(this));
}
watch.displayName = 'images:watch';
watch.description = 'Watch images for changes and re-compress';

exports.watch = watch;

// Clean
// -----

function clean() {
  var config = Object.assign({}, defaultConfig, this);

  return (0, _del2.default)((0, _arrayFlatten2.default)([config.dest]));
}
clean.displayName = 'images:clean';
clean.description = 'Clean fonts';

exports.clean = clean;