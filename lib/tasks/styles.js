'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clean = exports.watch = exports.build = exports.defaultConfig = exports.supportedExts = undefined;

var _gulp = require('gulp');

var _browserSync = require('./browserSync');

var _gulpMultidest = require('../util/gulp-multidest');

var _gulpMultidest2 = _interopRequireDefault(_gulpMultidest);

var _gulpSourcemaps = require('gulp-sourcemaps');

var _gulpSourcemaps2 = _interopRequireDefault(_gulpSourcemaps);

var _gulpAutoprefixer = require('gulp-autoprefixer');

var _gulpAutoprefixer2 = _interopRequireDefault(_gulpAutoprefixer);

var _gulpCssnano = require('gulp-cssnano');

var _gulpCssnano2 = _interopRequireDefault(_gulpCssnano);

var _gulpSass = require('gulp-sass');

var _gulpSass2 = _interopRequireDefault(_gulpSass);

var _gulpIf = require('gulp-if');

var _gulpIf2 = _interopRequireDefault(_gulpIf);

var _gulpPixrem = require('gulp-pixrem');

var _gulpPixrem2 = _interopRequireDefault(_gulpPixrem);

var _gulpStyleModules = require('gulp-style-modules');

var _gulpStyleModules2 = _interopRequireDefault(_gulpStyleModules);

var _gulpUtil = require('gulp-util');

var _nodeSassJsonImporter = require('node-sass-json-importer');

var _nodeSassJsonImporter2 = _interopRequireDefault(_nodeSassJsonImporter);

var _del = require('del');

var _del2 = _interopRequireDefault(_del);

var _arrayFlatten = require('array-flatten');

var _arrayFlatten2 = _interopRequireDefault(_arrayFlatten);

var _env = require('../util/env');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Styles
// ======

var supportedExts = exports.supportedExts = ['sass', 'scss', 'css'];
var defaultConfig = exports.defaultConfig = {
  modularize: false,
  minify: (0, _env.prod)(),
  sourcemaps: true,
  autoprefixer: {
    browsers: ['> 5%', 'last 2 versions'],
    cascade: false
  },
  nano: {}
};

// Build
// -----

function build(_config) {
  var config = _extends({}, defaultConfig, _config);

  return (0, _gulp.src)(config.src).pipe((0, _gulpIf2.default)(config.sourcemaps, _gulpSourcemaps2.default.init())).pipe((0, _gulpIf2.default)(/\.(sass|scss)$/, (0, _gulpSass2.default)({
    importer: _nodeSassJsonImporter2.default,
    includePaths: config.includePaths,
    precision: 10
  })).on('error', _gulpSass2.default.logError)).pipe((0, _gulpAutoprefixer2.default)(config.autoprefixer)).pipe((0, _gulpPixrem2.default)())
  // Concatenate and minify styles
  .pipe((0, _gulpIf2.default)('*.css', config.minify ? (0, _gulpCssnano2.default)(config.nano) : (0, _gulpUtil.noop)())).pipe((0, _gulpIf2.default)(config.modularize, (0, _gulpStyleModules2.default)())).pipe((0, _gulpIf2.default)('*.css', config.sourcemaps ? _gulpSourcemaps2.default.write('.') : (0, _gulpUtil.noop)())).pipe((0, _gulpMultidest2.default)(config.dest)).pipe((0, _browserSync.stream)());
}
build.displayName = 'styles:build';
build.description = 'Build styles';

exports.build = build;

// Watch
// -----

function watch(config) {
  (0, _gulp.watch)(config.all, function () {
    return build(config);
  });
}
watch.displayName = 'styles:watch';
watch.description = 'Watch styles for changes and re-build';

exports.watch = watch;

// Clean
// -----

function clean(config) {
  return (0, _del2.default)((0, _arrayFlatten2.default)([config.dest]).concat(['.sass-cache/']));
}
clean.displayName = 'styles:clean';
clean.description = 'Clean styles';

exports.clean = clean;