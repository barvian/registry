'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.supportedExts = undefined;
exports.process = process;
exports.load = load;

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _gulpSourcemaps = require('gulp-sourcemaps');

var _gulpSourcemaps2 = _interopRequireDefault(_gulpSourcemaps);

var _gulpAutoprefixer = require('gulp-autoprefixer');

var _gulpAutoprefixer2 = _interopRequireDefault(_gulpAutoprefixer);

var _gulpMinifyCss = require('gulp-minify-css');

var _gulpMinifyCss2 = _interopRequireDefault(_gulpMinifyCss);

var _gulpSass = require('gulp-sass');

var _gulpSass2 = _interopRequireDefault(_gulpSass);

var _gulpIf = require('gulp-if');

var _gulpIf2 = _interopRequireDefault(_gulpIf);

var _gulpFilter = require('gulp-filter');

var _gulpFilter2 = _interopRequireDefault(_gulpFilter);

var _gulpPixrem = require('gulp-pixrem');

var _gulpPixrem2 = _interopRequireDefault(_gulpPixrem);

var _gulpStyleModules = require('gulp-style-modules');

var _gulpStyleModules2 = _interopRequireDefault(_gulpStyleModules);

var _gulpUtil = require('gulp-util');

var _browserSync = require('./browserSync');

var _browserSync2 = _interopRequireDefault(_browserSync);

var _nodeSassJsonImporter = require('node-sass-json-importer');

var _nodeSassJsonImporter2 = _interopRequireDefault(_nodeSassJsonImporter);

var _del = require('del');

var _del2 = _interopRequireDefault(_del);

var _arrayFlatten = require('array-flatten');

var _arrayFlatten2 = _interopRequireDefault(_arrayFlatten);

var _env = require('../util/env');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var supportedExts = exports.supportedExts = ['sass', 'scss', 'css'];

function process(config) {
  var sassFilter = (0, _gulpFilter2.default)(['*.scss', '*.sass'], { restore: true });

  var pipeline = _gulp2.default.src(config.src).pipe((0, _gulpIf2.default)(!config.modularize, _gulpSourcemaps2.default.init())).pipe(sassFilter).pipe((0, _gulpSass2.default)({
    importer: _nodeSassJsonImporter2.default,
    includePaths: config.includePaths,
    precision: 10
  }).on('error', _gulpSass2.default.logError)).pipe(sassFilter.restore).pipe((0, _gulpAutoprefixer2.default)(Object.assign({
    browsers: ['> 5%', 'last 2 versions'],
    cascade: false
  }, config.autoprefixer))).pipe((0, _gulpPixrem2.default)())
  // Concatenate and minify styles
  .pipe((0, _gulpIf2.default)('*.css', (0, _env.prod)() ? (0, _gulpMinifyCss2.default)({
    mediaMerging: false
  }) : (0, _gulpUtil.noop)())).pipe((0, _gulpIf2.default)(config.modularize, (0, _gulpStyleModules2.default)())).pipe((0, _gulpIf2.default)(!config.modularize, _gulpSourcemaps2.default.write('.')));

  (0, _arrayFlatten2.default)([config.dest]).forEach(function (dest) {
    pipeline = pipeline.pipe(_gulp2.default.dest(dest));
  });

  return pipeline;
}

function load(gulp, config) {
  gulp.task('styles:build', function () {
    return process(config);
  });
  gulp.task('styles:watch', function () {
    return gulp.watch(config.all, function () {
      return process(config).pipe(_browserSync2.default.stream());
    });
  });
  gulp.task('styles:clean', function () {
    return (0, _del2.default)((0, _arrayFlatten2.default)([config.dest]).concat(['.sass-cache/']));
  });
}

exports.default = process;