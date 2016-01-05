'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clean = exports.watch = exports.build = exports.defaultConfig = exports.configurable = undefined;

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _gulpMultidest = require('../util/gulp-multidest');

var _gulpMultidest2 = _interopRequireDefault(_gulpMultidest);

var _gulpSvgmin = require('gulp-svgmin');

var _gulpSvgmin2 = _interopRequireDefault(_gulpSvgmin);

var _gulpSvgstore = require('gulp-svgstore');

var _gulpSvgstore2 = _interopRequireDefault(_gulpSvgstore);

var _gulpRename = require('gulp-rename');

var _gulpRename2 = _interopRequireDefault(_gulpRename);

var _gulpIf = require('gulp-if');

var _gulpIf2 = _interopRequireDefault(_gulpIf);

var _browserSync = require('./browserSync');

var _del = require('del');

var _del2 = _interopRequireDefault(_del);

var _arrayFlatten = require('array-flatten');

var _arrayFlatten2 = _interopRequireDefault(_arrayFlatten);

var _env = require('../util/env');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Sprites
// =======

var configurable = exports.configurable = true;
var defaultConfig = exports.defaultConfig = {
  minify: (0, _env.prod)(),
  bundle: 'sprites.svg',
  svgmin: {},
  svgstore: {
    inlineSvg: true
  }
};

// Build
// -----

function build() {
  var config = Object.assign({}, defaultConfig, this);

  return _gulp2.default.src(config.src).pipe((0, _gulpIf2.default)(config.minify, (0, _gulpSvgmin2.default)(config.svgmin))).pipe((0, _gulpSvgstore2.default)(config.svgstore)).pipe((0, _gulpRename2.default)(config.bundle)).pipe((0, _gulpMultidest2.default)(config.dest)).pipe((0, _browserSync.stream)());
}
build.displayName = 'sprites:build';
build.description = 'Build sprites';

exports.build = build;

// Watch
// -----

function watch() {
  var config = Object.assign({}, defaultConfig, this);

  _gulp2.default.watch(config.src, build.bind(this));
}
watch.displayName = 'sprites:watch';
watch.description = 'Watch sprites for changes and re-build';

exports.watch = watch;

// Clean
// -----

function clean() {
  var config = Object.assign({}, defaultConfig, this);

  return (0, _del2.default)((0, _arrayFlatten2.default)([config.dest]).map(function (dest) {
    return dest + '/' + config.bundle;
  }));
}
clean.displayName = 'sprites:clean';
clean.description = 'Clean sprites';

exports.clean = clean;