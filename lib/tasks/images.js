'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultConfig = undefined;
exports.minify = minify;
exports.load = load;

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _gulpImagemin = require('gulp-imagemin');

var _gulpImagemin2 = _interopRequireDefault(_gulpImagemin);

var _gulpChanged = require('gulp-changed');

var _gulpChanged2 = _interopRequireDefault(_gulpChanged);

var _gulpIf = require('gulp-if');

var _gulpIf2 = _interopRequireDefault(_gulpIf);

var _imageminPngquant = require('imagemin-pngquant');

var _imageminPngquant2 = _interopRequireDefault(_imageminPngquant);

var _browserSync = require('./browserSync');

var _browserSync2 = _interopRequireDefault(_browserSync);

var _del = require('del');

var _del2 = _interopRequireDefault(_del);

var _arrayFlatten = require('array-flatten');

var _arrayFlatten2 = _interopRequireDefault(_arrayFlatten);

var _env = require('../util/env');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultConfig = exports.defaultConfig = {
  minify: (0, _env.prod)(),
  imagemin: {
    progressive: true,
    interlaced: true,
    svgoPlugins: [{ removeViewBox: false }],
    use: [(0, _imageminPngquant2.default)()]
  }
};

function minify(config) {
  config = Object.assign(defaultConfig, config);
  var pipeline = _gulp2.default.src(config.src).pipe((0, _gulpChanged2.default)((0, _arrayFlatten2.default)([config.dest])[0])).pipe((0, _gulpIf2.default)(config.minify, (0, _gulpImagemin2.default)(config.imagemin)));

  (0, _arrayFlatten2.default)([config.dest]).forEach(function (dest) {
    pipeline = pipeline.pipe(_gulp2.default.dest(dest));
  });

  return pipeline;
}

function load(gulp, config) {
  gulp.task('images:build', function () {
    return minify(config);
  });
  gulp.task('images:watch', function () {
    return gulp.watch(config.src, function () {
      return minify(config).pipe(_browserSync2.default.stream());
    });
  });
  gulp.task('images:clean', function () {
    return (0, _del2.default)((0, _arrayFlatten2.default)([config.dest]));
  });
}

exports.default = minify;